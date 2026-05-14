import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { AppUser, UserRole } from '@/types';

export async function registerUser(
  email: string,
  password: string,
  displayName: string,
  role: UserRole = 'student'
): Promise<AppUser> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });

  const userData: AppUser = {
    uid: cred.user.uid,
    email,
    displayName,
    role,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'users', cred.user.uid), userData);
  return userData;
}

export async function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return signOut(auth);
}

export async function getUserData(uid: string): Promise<AppUser | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (snap.exists()) {
    return { uid: snap.id, ...snap.data() } as AppUser;
  }
  return null;
}
