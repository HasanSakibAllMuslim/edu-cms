export type UserRole = 'admin' | 'student' | 'guardian';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: any;
  updatedAt?: any;
  photoURL?: string;
}

export interface PageDoc {
  id?: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: any;
  updatedAt?: any;
  authorId?: string;
}

export interface NoticeDoc {
  id?: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: any;
  updatedAt?: any;
  authorId?: string;
}

export interface CourseDoc {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  duration: string;
  instructor: string;
  published: boolean;
  createdAt: any;
  updatedAt?: any;
}

export interface ResultDoc {
  id?: string;
  studentName: string;
  rollNumber: string;
  className: string;
  examName: string;
  subjects: SubjectResult[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  published: boolean;
  createdAt: any;
}

export interface SubjectResult {
  name: string;
  fullMarks: number;
  obtainedMarks: number;
}

export interface UploadDoc {
  id?: string;
  fileName: string;
  fileURL: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  createdAt: any;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logo?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}
