import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { PageDoc } from '@/types';
import { formatDate } from '@/utils';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

// Demo pages
const demoPages: Record<string, PageDoc> = {
  'admission-policy': {
    title: 'Admission Policy',
    slug: 'admission-policy',
    content: `<h2>Admission Requirements</h2>
    <p>EduCMS welcomes applications from students who demonstrate academic potential and a commitment to learning. Our admission process is designed to be transparent and inclusive.</p>
    <h3>Eligibility Criteria</h3>
    <ul>
      <li>Completed previous level of education with minimum required grades</li>
      <li>Valid identification documents</li>
      <li>Completed application form with all required information</li>
      <li>Payment of application processing fee</li>
    </ul>
    <h3>Application Process</h3>
    <ol>
      <li>Submit online application form</li>
      <li>Upload required documents</li>
      <li>Pay application fee</li>
      <li>Attend entrance assessment (if applicable)</li>
      <li>Receive admission decision</li>
    </ol>
    <p>For any queries regarding admissions, please contact our admissions office at admissions@educms.edu.</p>`,
    published: true,
    createdAt: new Date(),
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: `<h2>Privacy Policy</h2>
    <p>EduCMS is committed to protecting the privacy and security of our students, staff, and website visitors. This policy outlines how we collect, use, and protect your personal information.</p>
    <h3>Information We Collect</h3>
    <p>We collect information that you provide directly to us, including your name, email address, phone number, and academic records when necessary.</p>
    <h3>How We Use Your Information</h3>
    <p>Your information is used to provide educational services, communicate important updates, and improve our platform experience.</p>
    <h3>Data Security</h3>
    <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction.</p>`,
    published: true,
    createdAt: new Date(),
  },
};

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (slug && demoPages[slug]) {
        setPage(demoPages[slug]);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 400);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner text="Loading page..." />
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{page.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{formatDate(page.createdAt)}</p>

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </motion.div>
    </div>
  );
}
