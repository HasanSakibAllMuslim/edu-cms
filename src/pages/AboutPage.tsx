import { motion } from 'framer-motion';
import { GraduationCap, Target, Eye, Heart, Users, BookOpen, Award, Building } from 'lucide-react';

const team = [
  { name: 'Dr. Richard Clarke', role: 'Principal', emoji: '👨‍💼' },
  { name: 'Prof. Maria Santos', role: 'Vice Principal', emoji: '👩‍💼' },
  { name: 'Dr. James Wilson', role: 'Dean of Sciences', emoji: '👨‍🔬' },
  { name: 'Prof. Sarah Chen', role: 'Dean of Arts', emoji: '👩‍🎨' },
];

const stats = [
  { icon: Users, label: 'Students', value: '2,500+' },
  { icon: BookOpen, label: 'Courses', value: '50+' },
  { icon: Award, label: 'Awards', value: '100+' },
  { icon: Building, label: 'Years', value: '25+' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About EduCMS</h1>
            <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
              For over 25 years, we've been committed to providing world-class education that transforms lives and communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description: 'To provide accessible, high-quality education that empowers students to achieve their full potential and become responsible global citizens.',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                description: 'To be a leading educational institution recognized for academic excellence, innovation in teaching, and positive impact on society.',
                color: 'bg-emerald-50 text-emerald-600',
              },
              {
                icon: Heart,
                title: 'Our Values',
                description: 'Excellence, integrity, inclusivity, innovation, and community engagement form the foundation of everything we do.',
                color: 'bg-purple-50 text-purple-600',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="text-gray-600 space-y-4 text-left leading-relaxed">
              <p>
                Founded in 2000, EduCMS began with a simple vision: to make quality education accessible to all. Starting with just 50 students and a handful of dedicated teachers, we have grown into a thriving institution serving over 2,500 students.
              </p>
              <p>
                Over the years, we have expanded our academic programs, built state-of-the-art facilities, and developed innovative teaching methodologies. Our alumni have gone on to become leaders in technology, business, healthcare, and the arts.
              </p>
              <p>
                Today, EduCMS stands as a beacon of educational excellence, continuing to evolve and adapt to meet the challenges of the 21st century. We remain committed to our founding principles while embracing innovation and technology.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Leadership</h2>
            <p className="text-gray-500">Meet the team that drives our institution forward.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="text-center p-6 bg-gray-50 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {member.emoji}
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
