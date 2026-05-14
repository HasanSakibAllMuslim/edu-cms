import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Plus, Edit3, Trash2, Eye, EyeOff, Search, Save, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { NoticeDoc } from '@/types';
import { formatDate } from '@/utils';
import Modal from '@/components/shared/Modal';
import EmptyState from '@/components/shared/EmptyState';

const initialNotices: NoticeDoc[] = [
  { id: '1', title: 'Mid-Term Examination Schedule 2025', content: '<p>The mid-term examinations for all departments will commence from March 15, 2025.</p>', published: true, createdAt: new Date('2025-02-20') },
  { id: '2', title: 'Annual Sports Day Registration', content: '<p>Registration for the Annual Sports Day events is now open.</p>', published: true, createdAt: new Date('2025-02-18') },
  { id: '3', title: 'Library Extended Hours During Exams', content: '<p>The central library will remain open until 10 PM during the examination period.</p>', published: true, createdAt: new Date('2025-02-15') },
  { id: '4', title: 'Guest Lecture on AI (Draft)', content: '<p>Dr. James Wilson from MIT will deliver a guest lecture.</p>', published: false, createdAt: new Date('2025-02-12') },
];

export default function NoticesManager() {
  const [notices, setNotices] = useState<NoticeDoc[]>(initialNotices);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeDoc | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ title: '', content: '', published: true });

  const resetForm = () => {
    setForm({ title: '', content: '', published: true });
    setEditingNotice(null);
  };

  const openCreate = () => { resetForm(); setShowModal(true); };

  const openEdit = (notice: NoticeDoc) => {
    setEditingNotice(notice);
    setForm({ title: notice.title, content: notice.content, published: notice.published });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (editingNotice) {
      setNotices((prev) => prev.map((n) => (n.id === editingNotice.id ? { ...n, ...form } : n)));
      toast.success('Notice updated!');
    } else {
      setNotices((prev) => [{ id: Date.now().toString(), ...form, createdAt: new Date() }, ...prev]);
      toast.success('Notice created!');
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this notice?')) {
      setNotices((prev) => prev.filter((n) => n.id !== id));
      toast.success('Notice deleted');
    }
  };

  const togglePublish = (id: string) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, published: !n.published } : n)));
    toast.success('Status updated');
  };

  const filtered = notices.filter((n) => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
          <p className="text-sm text-gray-500 mt-1">Manage announcements and notifications</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> New Notice
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search notices..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Bell} title="No Notices" description="Create your first notice." action={{ label: 'Create Notice', onClick: openCreate }} />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((notice) => (
              <motion.div
                key={notice.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bell className="w-4 h-4 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 truncate">{notice.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(notice.createdAt)}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${notice.published ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {notice.published ? <><Eye className="w-3 h-3" /> Published</> : <><EyeOff className="w-3 h-3" /> Draft</>}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => togglePublish(notice.id!)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title={notice.published ? 'Unpublish' : 'Publish'}>
                      {notice.published ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-emerald-500" />}
                    </button>
                    <button onClick={() => openEdit(notice)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit3 className="w-4 h-4 text-blue-500" />
                    </button>
                    <button onClick={() => handleDelete(notice.id!)} className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editingNotice ? 'Edit Notice' : 'Create Notice'} size="lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Notice title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Notice content..." />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="noticePublished" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300" />
            <label htmlFor="noticePublished" className="text-sm text-gray-700">Publish immediately</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
              <Save className="w-4 h-4" /> {editingNotice ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
