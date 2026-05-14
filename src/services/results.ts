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
import { ResultDoc } from '@/types';

const COLLECTION = 'results';

export async function getResults(): Promise<ResultDoc[]> {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ResultDoc));
}

export async function searchResultsByRoll(rollNumber: string): Promise<ResultDoc[]> {
  const q = query(
    collection(db, COLLECTION),
    where('rollNumber', '==', rollNumber),
    where('published', '==', true)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ResultDoc));
}

export async function getResultById(id: string): Promise<ResultDoc | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as ResultDoc;
}

export async function createResult(data: Omit<ResultDoc, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateResult(id: string, data: Partial<ResultDoc>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { ...data });
}

export async function deleteResult(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
