import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { storage, db } from '@/config/firebase';
import { UploadDoc } from '@/types';

const COLLECTION = 'uploads';

export async function uploadFile(file: File, userId: string): Promise<UploadDoc> {
  const timestamp = Date.now();
  const storageRef = ref(storage, `uploads/${timestamp}_${file.name}`);
  await uploadBytes(storageRef, file);
  const fileURL = await getDownloadURL(storageRef);

  const uploadData = {
    fileName: file.name,
    fileURL,
    fileType: file.type,
    fileSize: file.size,
    uploadedBy: userId,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, COLLECTION), uploadData);
  return { id: docRef.id, ...uploadData } as UploadDoc;
}

export async function getUploads(): Promise<UploadDoc[]> {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UploadDoc));
}

export async function deleteUpload(id: string, fileURL: string): Promise<void> {
  try {
    const storageRef = ref(storage, fileURL);
    await deleteObject(storageRef);
  } catch (e) {
    // File may already be deleted from storage
  }
  await deleteDoc(doc(db, COLLECTION, id));
}
