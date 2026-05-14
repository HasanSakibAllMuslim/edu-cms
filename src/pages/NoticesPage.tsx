import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Search, ChevronRight } from 'lucide-react';
import { NoticeDoc } from '@/types';
import { formatDate, stripHtml, truncate } from '@/utils';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';

// Demo data for when Firebase is not configured
const demoNotices: NoticeDoc[] = [
  {
    id: '1',
    title: 'Mid-Term Examination Schedule 2025',
    content: '<p>The mid-term examinations for all departments will commence from March 15, 2025. Students are advised to collect their hall tickets from the examination cell. Please ensure you carry your ID cards during the examination.</p>',
    published: true,
    createdAt: new Date('2025-02-20'),
  },
  {
    id: '2',
    title: 'Annual Sports Day Registration',
    content: '<p>Registration for the Annual Sports Day events is now open. Students interested in participating in track and field, swimming, or team sports should register at the Sports Office before March 1, 2025.</p>',
    published: true,
    createdAt: new Date('2025-02-18'),
  },
  {
    id: '3',
    title: 'Library Extended Hours During Exams',
    content: '<p>The central library will remain open until 10 PM during the examination period. Students can access all reading materials and digital resources during extended hours.</p>',
    published: true,
    createdAt: new Date('2025-02-15'),
  },
  {
    id: '4',
    title: 'Guest Lecture on Artificial Intelligence',
    content: '<p>Dr. James Wilson from MIT will deliver a guest lecture on "The Future of AI in Education" on March 5, 2025, at the Main Auditorium. All students and faculty are invited to attend.</p>',
    published: true,
    createdAt: new Date('2025-02-12'),
  },
  {
    id: '5',
    title: 'Scholarship Applications Open',
    content: '<p>Applications for the Merit Scholarship Program 2025 are now being accepted. Eligible students with GPA 3.5 and above can apply through the student portal before March 30, 2025.</p>',
    published: true,
    createdAt: new Date('2025-02-10'),
  },
];

export default function NoticesPage() {
  const [notices, setNotices] = useState<NoticeDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<NoticeDoc | null>(null);

  useEffect(() => {
    // Use demo data
    setTimeout(() => {
      setNotices(demoNotices);
      setLoading(false);
    }, 500);
  }, []);

  const filtered = notices.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Bell className="w-7 h-7 text-amber-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Notices & Announcements</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Stay updated with the latest news, events, and important announcements.
        </p>
      </motion.div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading notices..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No Notices Found"
          description={searchTerm ? 'Try a different search term.' : 'No notices have been published yet.'}
        />
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {filtered.map((notice, i) => (
            <motion.div
              key={notice.id}
              className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedNotice(selectedNotice?.id === notice.id ? null : notice)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {notice.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(notice.createdAt)}</span>
                  </div>
                  {selectedNotice?.id !== notice.id && (
                    <p className="text-sm text-gray-500 mt-2">{truncate(stripHtml(notice.content), 120)}</p>
                  )}
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-1 transition-transform ${
                    selectedNotice?.id === notice.id ? 'rotate-90' : ''
                  }`}
                />
              </div>

              {selectedNotice?.id === notice.id && (
                <motion.div
                  className="mt-4 pt-4 border-t border-gray-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div
                    className="prose prose-sm max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{ __html: notice.content }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
