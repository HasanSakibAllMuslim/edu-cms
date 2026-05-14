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
import { PageDoc } from '@/types';

const COLLECTION = 'pages';

export async function getPages(): Promise<PageDoc[]> {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PageDoc));
}

export async function getPublishedPages(): Promise<PageDoc[]> {
  const q = query(
    collection(db, COLLECTION),
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PageDoc));
}

export async function getPageBySlug(slug: string): Promise<PageDoc | null> {
  const q = query(collection(db, COLLECTION), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as PageDoc;
}

export async function getPageById(id: string): Promise<PageDoc | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as PageDoc;
}

export async function createPage(data: Omit<PageDoc, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updatePage(id: string, data: Partial<PageDoc>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePage(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
