import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Plus, Edit3, Trash2, Eye, EyeOff, Search, ExternalLink, Save, X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PageDoc } from '@/types';
import { slugify } from '@/utils';
import Modal from '@/components/shared/Modal';
import EmptyState from '@/components/shared/EmptyState';

const initialPages: PageDoc[] = [
  { id: '1', title: 'Admission Policy', slug: 'admission-policy', content: '<p>Our admission policy ensures fair and transparent access to education for all eligible students.</p>', published: true, createdAt: new Date('2025-01-15') },
  { id: '2', title: 'Privacy Policy', slug: 'privacy-policy', content: '<p>We are committed to protecting the privacy and security of our students and staff.</p>', published: true, createdAt: new Date('2025-01-10') },
  { id: '3', title: 'Fee Structure', slug: 'fee-structure', content: '<p>Detailed breakdown of tuition fees, lab fees, and other charges for the academic year.</p>', published: false, createdAt: new Date('2025-02-01') },
];

export default function PagesManager() {
  const [pages, setPages] = useState<PageDoc[]>(initialPages);
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<PageDoc | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ title: '', slug: '', content: '', published: true });

  const resetForm = () => {
    setForm({ title: '', slug: '', content: '', published: true });
    setEditingPage(null);
  };

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (page: PageDoc) => {
    setEditingPage(page);
    setForm({ title: page.title, slug: page.slug, content: page.content, published: page.published });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    const slug = form.slug || slugify(form.title);

    if (editingPage) {
      setPages((prev) =>
        prev.map((p) => (p.id === editingPage.id ? { ...p, ...form, slug } : p))
      );
      toast.success('Page updated successfully!');
    } else {
      const newPage: PageDoc = {
        id: Date.now().toString(),
        ...form,
        slug,
        createdAt: new Date(),
      };
      setPages((prev) => [newPage, ...prev]);
      toast.success('Page created successfully!');
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      setPages((prev) => prev.filter((p) => p.id !== id));
      toast.success('Page deleted');
    }
  };

  const togglePublish = (id: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
    toast.success('Page status updated');
  };

  const filtered = pages.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage dynamic pages for your website</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Page
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search pages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      </div>

      {/* Pages list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Pages Found"
          description="Create your first page to get started."
          action={{ label: 'Create Page', onClick: openCreate }}
        />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden sm:table-cell">Slug</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {filtered.map((page) => (
                    <motion.tr
                      key={page.id}
                      className="hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{page.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">/{page.slug}</code>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            page.published
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {page.published ? (
                            <><Eye className="w-3 h-3" /> Published</>
                          ) : (
                            <><EyeOff className="w-3 h-3" /> Draft</>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => togglePublish(page.id!)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title={page.published ? 'Unpublish' : 'Publish'}
                          >
                            {page.published ? (
                              <EyeOff className="w-4 h-4 text-gray-500" />
                            ) : (
                              <Eye className="w-4 h-4 text-emerald-500" />
                            )}
                          </button>
                          <button
                            onClick={() => openEdit(page)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Edit3 className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            onClick={() => handleDelete(page.id!)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); resetForm(); }}
        title={editingPage ? 'Edit Page' : 'Create New Page'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="e.g. About Our School"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-400">/page/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="about-our-school"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={8}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono"
              placeholder="<p>Write your page content here...</p>"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <label htmlFor="published" className="text-sm text-gray-700">Publish immediately</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => { setShowModal(false); resetForm(); }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> {editingPage ? 'Update' : 'Create'} Page
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
