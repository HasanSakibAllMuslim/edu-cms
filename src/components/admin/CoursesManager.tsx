import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Edit3, Trash2, Eye, EyeOff, Search, Save, Clock, User, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { CourseDoc } from '@/types';
import Modal from '@/components/shared/Modal';
import EmptyState from '@/components/shared/EmptyState';

const initialCourses: CourseDoc[] = [
  { id: '1', title: 'Computer Science & Engineering', description: 'Learn computing fundamentals, algorithms, and software development.', imageURL: '', duration: '4 Years', instructor: 'Dr. Robert Smith', published: true, createdAt: new Date() },
  { id: '2', title: 'Business Administration', description: 'Develop essential business, management, and entrepreneurship skills.', imageURL: '', duration: '3 Years', instructor: 'Prof. Lisa Anderson', published: true, createdAt: new Date() },
  { id: '3', title: 'Digital Marketing', description: 'Master SEO, social media, content marketing, and analytics.', imageURL: '', duration: '6 Months', instructor: 'Mr. David Park', published: true, createdAt: new Date() },
  { id: '4', title: 'Data Science & Analytics', description: 'Explore statistics, machine learning, and data visualization.', imageURL: '', duration: '2 Years', instructor: 'Dr. Sarah Kim', published: false, createdAt: new Date() },
];

const courseEmojis = ['💻', '📊', '📱', '🔬', '🎨', '⚙️', '📚', '🎓'];

export default function CoursesManager() {
  const [courses, setCourses] = useState<CourseDoc[]>(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseDoc | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ title: '', description: '', imageURL: '', duration: '', instructor: '', published: true });

  const resetForm = () => {
    setForm({ title: '', description: '', imageURL: '', duration: '', instructor: '', published: true });
    setEditingCourse(null);
  };

  const openCreate = () => { resetForm(); setShowModal(true); };

  const openEdit = (course: CourseDoc) => {
    setEditingCourse(course);
    setForm({ title: course.title, description: course.description, imageURL: course.imageURL, duration: course.duration, instructor: course.instructor, published: course.published });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (editingCourse) {
      setCourses((prev) => prev.map((c) => (c.id === editingCourse.id ? { ...c, ...form } : c)));
      toast.success('Course updated!');
    } else {
      setCourses((prev) => [{ id: Date.now().toString(), ...form, createdAt: new Date() }, ...prev]);
      toast.success('Course created!');
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this course?')) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast.success('Course deleted');
    }
  };

  const togglePublish = (id: string) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, published: !c.published } : c)));
    toast.success('Status updated');
  };

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your educational courses and programs</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> New Course
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title="No Courses" description="Create your first course." action={{ label: 'Create Course', onClick: openCreate }} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                layout
              >
                <div className={`h-24 bg-gradient-to-br ${['from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600', 'from-purple-500 to-pink-600'][i % 4]} flex items-center justify-center`}>
                  <span className="text-4xl">{courseEmojis[i % courseEmojis.length]}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${course.published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                      {course.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{course.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1 border-t border-gray-100 pt-3">
                    <button onClick={() => togglePublish(course.id!)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title={course.published ? 'Unpublish' : 'Publish'}>
                      {course.published ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-emerald-500" />}
                    </button>
                    <button onClick={() => openEdit(course)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit3 className="w-4 h-4 text-blue-500" />
                    </button>
                    <button onClick={() => handleDelete(course.id!)} className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editingCourse ? 'Edit Course' : 'Create Course'} size="lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="e.g. Computer Science" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Course description..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="e.g. 4 Years" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
              <input type="text" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Instructor name" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="url" value={form.imageURL} onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="https://..." />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="coursePublished" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300" />
            <label htmlFor="coursePublished" className="text-sm text-gray-700">Publish immediately</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
              <Save className="w-4 h-4" /> {editingCourse ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
