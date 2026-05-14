import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';

const galleryItems = [
  { id: 1, title: 'Science Lab', category: 'Facilities', color: 'from-blue-400 to-indigo-600', emoji: '🔬' },
  { id: 2, title: 'Library', category: 'Facilities', color: 'from-amber-400 to-orange-600', emoji: '📚' },
  { id: 3, title: 'Sports Day', category: 'Events', color: 'from-emerald-400 to-teal-600', emoji: '🏆' },
  { id: 4, title: 'Computer Lab', category: 'Facilities', color: 'from-purple-400 to-pink-600', emoji: '💻' },
  { id: 5, title: 'Cultural Fest', category: 'Events', color: 'from-rose-400 to-red-600', emoji: '🎭' },
  { id: 6, title: 'Graduation Day', category: 'Events', color: 'from-cyan-400 to-blue-600', emoji: '🎓' },
  { id: 7, title: 'Campus Garden', category: 'Campus', color: 'from-green-400 to-emerald-600', emoji: '🌿' },
  { id: 8, title: 'Workshop', category: 'Events', color: 'from-orange-400 to-red-600', emoji: '🛠️' },
  { id: 9, title: 'Main Building', category: 'Campus', color: 'from-slate-400 to-gray-600', emoji: '🏛️' },
  { id: 10, title: 'Art Exhibition', category: 'Events', color: 'from-pink-400 to-rose-600', emoji: '🎨' },
  { id: 11, title: 'Auditorium', category: 'Facilities', color: 'from-indigo-400 to-purple-600', emoji: '🎪' },
  { id: 12, title: 'Study Area', category: 'Facilities', color: 'from-teal-400 to-cyan-600', emoji: '📖' },
];

const categories = ['All', 'Facilities', 'Events', 'Campus'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const filtered = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Camera className="w-7 h-7 text-purple-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Gallery</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Take a visual tour of our campus, facilities, and memorable events.
        </p>
      </motion.div>

      {/* Category filter */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              className={`aspect-square bg-gradient-to-br ${item.color} rounded-2xl cursor-pointer overflow-hidden relative group`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl">{item.emoji}</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white text-sm font-semibold">{item.title}</p>
                <p className="text-white/70 text-xs">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className={`w-full max-w-lg aspect-square bg-gradient-to-br ${selectedItem.color} rounded-3xl flex flex-col items-center justify-center relative`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <span className="text-8xl mb-6">{selectedItem.emoji}</span>
              <h3 className="text-2xl font-bold text-white">{selectedItem.title}</h3>
              <p className="text-white/70 mt-1">{selectedItem.category}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
