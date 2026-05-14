import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { NoticeDoc } from '@/types';

const COLLECTION = 'notices';

export async function getNotices(): Promise<NoticeDoc[]> {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as NoticeDoc));
}

export async function getPublishedNotices(): Promise<NoticeDoc[]> {
  const q = query(
    collection(db, COLLECTION),
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as NoticeDoc));
}

export async function getNoticeById(id: string): Promise<NoticeDoc | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as NoticeDoc;
}

export async function createNotice(data: Omit<NoticeDoc, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateNotice(id: string, data: Partial<NoticeDoc>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteNotice(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
