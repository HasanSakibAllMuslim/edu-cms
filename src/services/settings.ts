import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { SiteSettings } from '@/types';

const DOC_PATH = 'settings';
const DOC_ID = 'site';

const defaultSettings: SiteSettings = {
  siteName: 'EduCMS Academy',
  siteDescription: 'A modern educational institution committed to excellence',
  contactEmail: 'info@educms.edu',
  contactPhone: '+1 (555) 123-4567',
  address: '123 Education Street, Knowledge City, ST 12345',
  heroTitle: 'Empowering Minds, Shaping Futures',
  heroSubtitle: 'Join our community of learners and unlock your potential with world-class education and innovative teaching methods.',
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const snap = await getDoc(doc(db, DOC_PATH, DOC_ID));
    if (snap.exists()) {
      return snap.data() as SiteSettings;
    }
  } catch (e) {
    // Return defaults if Firebase is not configured
  }
  return defaultSettings;
}

export async function updateSettings(data: Partial<SiteSettings>): Promise<void> {
  await setDoc(doc(db, DOC_PATH, DOC_ID), data, { merge: true });
}

export { defaultSettings };
