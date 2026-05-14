import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Bell, Award, ArrowRight, CheckCircle, Star } from 'lucide-react';
import HeroSection from '@/components/public/HeroSection';

const features = [
  {
    icon: BookOpen,
    title: 'Diverse Courses',
    description: 'Wide range of academic programs designed to meet industry demands and student aspirations.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Award,
    title: 'Expert Faculty',
    description: 'Learn from experienced professors and industry professionals dedicated to your success.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Bell,
    title: 'Stay Updated',
    description: 'Get real-time notifications about exam results, notices, and important announcements.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Star,
    title: 'Modern Facilities',
    description: 'State-of-the-art labs, libraries, and learning spaces to enhance your educational experience.',
    color: 'bg-purple-50 text-purple-600',
  },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Computer Science Student', text: 'EduCMS transformed my learning experience. The courses are well-structured and the faculty is incredibly supportive.', avatar: 'S' },
  { name: 'Michael Chen', role: 'Engineering Graduate', text: 'The practical approach to education here prepared me perfectly for the industry. Highly recommended!', avatar: 'M' },
  { name: 'Emily Davis', role: 'Parent', text: 'As a parent, I appreciate the transparency and ease of accessing my child\'s results and notices online.', avatar: 'E' },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose EduCMS?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We provide a comprehensive educational experience that prepares students for success in their careers and lives.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                <p className="text-indigo-100 mb-6">
                  Explore our courses and discover the perfect program for your future.
                </p>
                <div className="space-y-3">
                  {['Flexible Learning Options', 'Industry-Ready Curriculum', 'Scholarship Programs Available'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  View Courses <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-gray-500">Hear from our students, alumni, and parents.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="p-6 bg-gray-50 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold text-sm">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
