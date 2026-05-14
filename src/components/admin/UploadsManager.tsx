import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, Image, FileText, Trash2, Copy, Download, Search, FolderOpen, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { UploadDoc } from '@/types';
import { fileSize, formatDate } from '@/utils';

const initialUploads: UploadDoc[] = [
  { id: '1', fileName: 'syllabus_2025.pdf', fileURL: '#', fileType: 'application/pdf', fileSize: 2457600, uploadedBy: 'admin', createdAt: new Date('2025-02-15') },
  { id: '2', fileName: 'campus_photo.jpg', fileURL: '#', fileType: 'image/jpeg', fileSize: 1843200, uploadedBy: 'admin', createdAt: new Date('2025-02-14') },
  { id: '3', fileName: 'admission_form.pdf', fileURL: '#', fileType: 'application/pdf', fileSize: 512000, uploadedBy: 'admin', createdAt: new Date('2025-02-12') },
  { id: '4', fileName: 'timetable.xlsx', fileURL: '#', fileType: 'application/vnd.ms-excel', fileSize: 102400, uploadedBy: 'admin', createdAt: new Date('2025-02-10') },
  { id: '5', fileName: 'banner_image.png', fileURL: '#', fileType: 'image/png', fileSize: 3276800, uploadedBy: 'admin', createdAt: new Date('2025-02-08') },
];

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image;
  return FileText;
};

const getFileColor = (type: string) => {
  if (type.startsWith('image/')) return 'bg-purple-50 text-purple-600';
  if (type.includes('pdf')) return 'bg-red-50 text-red-600';
  if (type.includes('excel') || type.includes('spreadsheet')) return 'bg-emerald-50 text-emerald-600';
  return 'bg-blue-50 text-blue-600';
};

export default function UploadsManager() {
  const [uploads, setUploads] = useState<UploadDoc[]>(initialUploads);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      const newUploads: UploadDoc[] = Array.from(files).map((file, i) => ({
        id: (Date.now() + i).toString(),
        fileName: file.name,
        fileURL: URL.createObjectURL(file),
        fileType: file.type,
        fileSize: file.size,
        uploadedBy: 'admin',
        createdAt: new Date(),
      }));
      setUploads((prev) => [...newUploads, ...prev]);
      setUploading(false);
      toast.success(`${files.length} file(s) uploaded successfully!`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1500);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this file?')) {
      setUploads((prev) => prev.filter((u) => u.id !== id));
      toast.success('File deleted');
    }
  };

  const handleCopyURL = (id: string, url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedId(id);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = uploads.filter((u) =>
    u.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSize = uploads.reduce((sum, u) => sum + u.fileSize, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">File Manager</h1>
          <p className="text-sm text-gray-500 mt-1">
            {uploads.length} files • {fileSize(totalSize)} total
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Upload Files
          </label>
        </div>
      </div>

      {/* Upload area */}
      <div
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <motion.div
              className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-sm text-gray-500">Uploading files...</p>
          </div>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-600 font-medium">Drop files here or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">Supports images, PDFs, documents, and more</p>
          </>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search files..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
      </div>

      {/* Files grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No files found</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence>
            {filtered.map((upload) => {
              const Icon = getFileIcon(upload.fileType);
              const colorClass = getFileColor(upload.fileType);
              return (
                <motion.div
                  key={upload.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-all"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{upload.fileName}</p>
                      <p className="text-xs text-gray-500">{fileSize(upload.fileSize)} • {formatDate(upload.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleCopyURL(upload.id!, upload.fileURL)}
                      className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === upload.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                    </button>
                    <button onClick={() => handleDelete(upload.id!)} className="p-1.5 rounded hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
