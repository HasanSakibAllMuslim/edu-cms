import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, User, BookOpen, Hash, Trophy } from 'lucide-react';
import { ResultDoc } from '@/types';

const demoResults: Record<string, ResultDoc[]> = {
  '1001': [
    {
      id: '1',
      studentName: 'John Smith',
      rollNumber: '1001',
      className: 'Class 10-A',
      examName: 'Mid-Term Examination 2025',
      subjects: [
        { name: 'Mathematics', fullMarks: 100, obtainedMarks: 92 },
        { name: 'Science', fullMarks: 100, obtainedMarks: 88 },
        { name: 'English', fullMarks: 100, obtainedMarks: 85 },
        { name: 'History', fullMarks: 100, obtainedMarks: 78 },
        { name: 'Computer Science', fullMarks: 100, obtainedMarks: 95 },
      ],
      totalMarks: 500,
      obtainedMarks: 438,
      percentage: 87.6,
      grade: 'A',
      published: true,
      createdAt: new Date(),
    },
  ],
  '1002': [
    {
      id: '2',
      studentName: 'Emma Johnson',
      rollNumber: '1002',
      className: 'Class 10-A',
      examName: 'Mid-Term Examination 2025',
      subjects: [
        { name: 'Mathematics', fullMarks: 100, obtainedMarks: 95 },
        { name: 'Science', fullMarks: 100, obtainedMarks: 91 },
        { name: 'English', fullMarks: 100, obtainedMarks: 93 },
        { name: 'History', fullMarks: 100, obtainedMarks: 89 },
        { name: 'Computer Science', fullMarks: 100, obtainedMarks: 97 },
      ],
      totalMarks: 500,
      obtainedMarks: 465,
      percentage: 93.0,
      grade: 'A+',
      published: true,
      createdAt: new Date(),
    },
  ],
};

export default function ResultsPage() {
  const [rollNumber, setRollNumber] = useState('');
  const [results, setResults] = useState<ResultDoc[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumber.trim()) return;
    setLoading(true);
    setSearched(true);
    setTimeout(() => {
      setResults(demoResults[rollNumber.trim()] || []);
      setLoading(false);
    }, 800);
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+') return 'text-emerald-600 bg-emerald-50';
    if (grade === 'A') return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('B')) return 'text-amber-600 bg-amber-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Award className="w-7 h-7 text-emerald-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Search Results</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Enter your roll number to view your examination results.
        </p>
      </motion.div>

      {/* Search form */}
      <div className="max-w-md mx-auto mb-10">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter roll number (try 1001 or 1002)"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <motion.div
            className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {!loading && searched && results !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {results.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No Results Found</h3>
                <p className="text-sm text-gray-500 mt-1">No results found for roll number "{rollNumber}".</p>
              </div>
            ) : (
              results.map((result) => (
                <div key={result.id} className="max-w-3xl mx-auto">
                  {/* Student info card */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                          <User className="w-8 h-8" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{result.studentName}</h2>
                          <div className="flex items-center gap-4 mt-1 text-indigo-100 text-sm">
                            <span>Roll: {result.rollNumber}</span>
                            <span>•</span>
                            <span>{result.className}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-6">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{result.examName}</h3>
                      </div>

                      {/* Subjects table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-semibold text-gray-600">Subject</th>
                              <th className="text-center py-3 px-4 font-semibold text-gray-600">Full Marks</th>
                              <th className="text-center py-3 px-4 font-semibold text-gray-600">Obtained</th>
                              <th className="text-center py-3 px-4 font-semibold text-gray-600">Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.subjects.map((sub, i) => (
                              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="py-3 px-4 font-medium text-gray-900">{sub.name}</td>
                                <td className="py-3 px-4 text-center text-gray-600">{sub.fullMarks}</td>
                                <td className="py-3 px-4 text-center font-semibold text-gray-900">{sub.obtainedMarks}</td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                    (sub.obtainedMarks / sub.fullMarks) * 100 >= 80
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : (sub.obtainedMarks / sub.fullMarks) * 100 >= 60
                                      ? 'bg-blue-50 text-blue-700'
                                      : 'bg-amber-50 text-amber-700'
                                  }`}>
                                    {((sub.obtainedMarks / sub.fullMarks) * 100).toFixed(1)}%
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Summary */}
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <p className="text-xs text-gray-500 mb-1">Total Marks</p>
                          <p className="text-xl font-bold text-gray-900">{result.totalMarks}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <p className="text-xs text-gray-500 mb-1">Obtained</p>
                          <p className="text-xl font-bold text-indigo-600">{result.obtainedMarks}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <p className="text-xs text-gray-500 mb-1">Percentage</p>
                          <p className="text-xl font-bold text-emerald-600">{result.percentage}%</p>
                        </div>
                        <div className={`rounded-xl p-4 text-center ${getGradeColor(result.grade)}`}>
                          <p className="text-xs opacity-70 mb-1">Grade</p>
                          <div className="flex items-center justify-center gap-1">
                            <Trophy className="w-5 h-5" />
                            <p className="text-xl font-bold">{result.grade}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
