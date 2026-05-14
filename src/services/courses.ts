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
import { CourseDoc } from '@/types';

const COLLECTION = 'courses';

export async function getCourses(): Promise<CourseDoc[]> {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CourseDoc));
}

export async function getPublishedCourses(): Promise<CourseDoc[]> {
  const q = query(
    collection(db, COLLECTION),
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CourseDoc));
}

export async function getCourseById(id: string): Promise<CourseDoc | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as CourseDoc;
}

export async function createCourse(data: Omit<CourseDoc, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCourse(id: string, data: Partial<CourseDoc>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCourse(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
