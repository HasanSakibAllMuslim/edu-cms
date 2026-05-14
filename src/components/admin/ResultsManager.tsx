import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, Edit3, Trash2, Search, Save, Eye, EyeOff, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { ResultDoc, SubjectResult } from '@/types';
import { calculateGrade } from '@/utils';
import Modal from '@/components/shared/Modal';
import EmptyState from '@/components/shared/EmptyState';

const initialResults: ResultDoc[] = [
  {
    id: '1', studentName: 'John Smith', rollNumber: '1001', className: 'Class 10-A', examName: 'Mid-Term 2025',
    subjects: [
      { name: 'Mathematics', fullMarks: 100, obtainedMarks: 92 },
      { name: 'Science', fullMarks: 100, obtainedMarks: 88 },
      { name: 'English', fullMarks: 100, obtainedMarks: 85 },
    ],
    totalMarks: 300, obtainedMarks: 265, percentage: 88.3, grade: 'A', published: true, createdAt: new Date(),
  },
  {
    id: '2', studentName: 'Emma Johnson', rollNumber: '1002', className: 'Class 10-A', examName: 'Mid-Term 2025',
    subjects: [
      { name: 'Mathematics', fullMarks: 100, obtainedMarks: 95 },
      { name: 'Science', fullMarks: 100, obtainedMarks: 91 },
      { name: 'English', fullMarks: 100, obtainedMarks: 93 },
    ],
    totalMarks: 300, obtainedMarks: 279, percentage: 93.0, grade: 'A+', published: true, createdAt: new Date(),
  },
];

const emptySubject: SubjectResult = { name: '', fullMarks: 100, obtainedMarks: 0 };

export default function ResultsManager() {
  const [results, setResults] = useState<ResultDoc[]>(initialResults);
  const [showModal, setShowModal] = useState(false);
  const [editingResult, setEditingResult] = useState<ResultDoc | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    studentName: '', rollNumber: '', className: '', examName: '', published: true,
    subjects: [{ ...emptySubject }] as SubjectResult[],
  });

  const resetForm = () => {
    setForm({ studentName: '', rollNumber: '', className: '', examName: '', published: true, subjects: [{ ...emptySubject }] });
    setEditingResult(null);
  };

  const openCreate = () => { resetForm(); setShowModal(true); };

  const openEdit = (result: ResultDoc) => {
    setEditingResult(result);
    setForm({
      studentName: result.studentName, rollNumber: result.rollNumber, className: result.className,
      examName: result.examName, published: result.published,
      subjects: result.subjects.map((s) => ({ ...s })),
    });
    setShowModal(true);
  };

  const addSubject = () => setForm({ ...form, subjects: [...form.subjects, { ...emptySubject }] });

  const removeSubject = (index: number) => {
    if (form.subjects.length <= 1) return;
    setForm({ ...form, subjects: form.subjects.filter((_, i) => i !== index) });
  };

  const updateSubject = (index: number, field: keyof SubjectResult, value: string | number) => {
    const updated = form.subjects.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    setForm({ ...form, subjects: updated });
  };

  const handleSave = () => {
    if (!form.studentName.trim() || !form.rollNumber.trim()) {
      toast.error('Student name and roll number are required');
      return;
    }
    const totalMarks = form.subjects.reduce((sum, s) => sum + Number(s.fullMarks), 0);
    const obtainedMarks = form.subjects.reduce((sum, s) => sum + Number(s.obtainedMarks), 0);
    const percentage = totalMarks > 0 ? Math.round((obtainedMarks / totalMarks) * 1000) / 10 : 0;
    const grade = calculateGrade(percentage);

    const resultData = { ...form, totalMarks, obtainedMarks, percentage, grade };

    if (editingResult) {
      setResults((prev) => prev.map((r) => (r.id === editingResult.id ? { ...r, ...resultData } : r)));
      toast.success('Result updated!');
    } else {
      setResults((prev) => [{ id: Date.now().toString(), ...resultData, createdAt: new Date() }, ...prev]);
      toast.success('Result created!');
    }
    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this result?')) {
      setResults((prev) => prev.filter((r) => r.id !== id));
      toast.success('Result deleted');
    }
  };

  const togglePublish = (id: string) => {
    setResults((prev) => prev.map((r) => (r.id === id ? { ...r, published: !r.published } : r)));
    toast.success('Status updated');
  };

  const filtered = results.filter((r) =>
    r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.rollNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Results</h1>
          <p className="text-sm text-gray-500 mt-1">Manage student examination results</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Result
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search by name or roll..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Award} title="No Results" description="Add student results." action={{ label: 'Add Result', onClick: openCreate }} />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Roll</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden md:table-cell">Class</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden md:table-cell">Exam</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">%</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Grade</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{result.studentName}</td>
                    <td className="py-3 px-4 text-gray-600">{result.rollNumber}</td>
                    <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{result.className}</td>
                    <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{result.examName}</td>
                    <td className="py-3 px-4 text-center font-semibold text-indigo-600">{result.percentage}%</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        result.grade === 'A+' ? 'bg-emerald-50 text-emerald-700' :
                        result.grade === 'A' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>{result.grade}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-medium ${result.published ? 'text-emerald-600' : 'text-gray-500'}`}>
                        {result.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => togglePublish(result.id!)} className="p-1.5 rounded hover:bg-gray-100">
                          {result.published ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-emerald-500" />}
                        </button>
                        <button onClick={() => openEdit(result)} className="p-1.5 rounded hover:bg-gray-100">
                          <Edit3 className="w-4 h-4 text-blue-500" />
                        </button>
                        <button onClick={() => handleDelete(result.id!)} className="p-1.5 rounded hover:bg-red-50">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editingResult ? 'Edit Result' : 'Add Result'} size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input type="text" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <input type="text" value={form.rollNumber} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <input type="text" value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name</label>
              <input type="text" value={form.examName} onChange={(e) => setForm({ ...form, examName: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Subjects</label>
              <button onClick={addSubject} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Subject
              </button>
            </div>
            <div className="space-y-2">
              {form.subjects.map((subject, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="text" placeholder="Subject" value={subject.name} onChange={(e) => updateSubject(i, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  <input type="number" placeholder="Full" value={subject.fullMarks} onChange={(e) => updateSubject(i, 'fullMarks', Number(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  <input type="number" placeholder="Got" value={subject.obtainedMarks} onChange={(e) => updateSubject(i, 'obtainedMarks', Number(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                  {form.subjects.length > 1 && (
                    <button onClick={() => removeSubject(i)} className="p-1.5 rounded hover:bg-red-50">
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="resultPublished" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300" />
            <label htmlFor="resultPublished" className="text-sm text-gray-700">Publish result</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
              <Save className="w-4 h-4" /> {editingResult ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
