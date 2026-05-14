import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, User, Search, GraduationCap } from 'lucide-react';
import { CourseDoc } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';

const demoCourses: CourseDoc[] = [
  {
    id: '1',
    title: 'Computer Science & Engineering',
    description: 'Learn the fundamentals of computing, algorithms, data structures, and software development. This comprehensive program covers everything from programming basics to advanced topics like AI and machine learning.',
    imageURL: '',
    duration: '4 Years',
    instructor: 'Dr. Robert Smith',
    published: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Business Administration',
    description: 'Develop essential business skills including management, finance, marketing, and entrepreneurship. Gain practical experience through case studies and real-world projects.',
    imageURL: '',
    duration: '3 Years',
    instructor: 'Prof. Lisa Anderson',
    published: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Digital Marketing',
    description: 'Master digital marketing strategies including SEO, social media, content marketing, and analytics. Learn to create and manage successful digital campaigns.',
    imageURL: '',
    duration: '6 Months',
    instructor: 'Mr. David Park',
    published: true,
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Data Science & Analytics',
    description: 'Explore the world of data through statistics, machine learning, and visualization. Learn to extract insights from complex datasets using Python and R.',
    imageURL: '',
    duration: '2 Years',
    instructor: 'Dr. Sarah Kim',
    published: true,
    createdAt: new Date(),
  },
  {
    id: '5',
    title: 'Graphic Design',
    description: 'Develop creative skills in visual communication, typography, branding, and UI/UX design. Work with industry-standard tools like Adobe Creative Suite and Figma.',
    imageURL: '',
    duration: '1 Year',
    instructor: 'Ms. Emma Wilson',
    published: true,
    createdAt: new Date(),
  },
  {
    id: '6',
    title: 'Mechanical Engineering',
    description: 'Study the principles of mechanics, thermodynamics, materials science, and manufacturing. Gain hands-on experience with CAD tools and workshop practices.',
    imageURL: '',
    duration: '4 Years',
    instructor: 'Prof. James Miller',
    published: true,
    createdAt: new Date(),
  },
];

const courseColors = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-pink-600',
  'from-rose-500 to-red-600',
  'from-cyan-500 to-blue-600',
];

const courseIcons = ['💻', '📊', '📱', '🔬', '🎨', '⚙️'];

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setCourses(demoCourses);
      setLoading(false);
    }, 500);
  }, []);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-7 h-7 text-blue-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Our Courses</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Explore our diverse range of programs designed for your academic and professional growth.
        </p>
      </motion.div>

      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading courses..." />
      ) : filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No Courses Found" description="Try a different search term." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className={`h-40 bg-gradient-to-br ${courseColors[i % courseColors.length]} flex items-center justify-center`}>
                <span className="text-6xl">{courseIcons[i % courseIcons.length]}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{course.instructor.split(' ').slice(-1)[0]}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
