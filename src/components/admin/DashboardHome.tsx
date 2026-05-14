import { motion } from 'framer-motion';
import {
  FileText,
  Bell,
  BookOpen,
  Award,
  Users,
  Upload,
  TrendingUp,
  ArrowUpRight,
  BarChart3,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Pages', value: '12', icon: FileText, color: 'bg-blue-500', change: '+2 this month', link: '/admin/pages' },
  { label: 'Active Notices', value: '8', icon: Bell, color: 'bg-amber-500', change: '+3 this week', link: '/admin/notices' },
  { label: 'Courses', value: '6', icon: BookOpen, color: 'bg-emerald-500', change: '2 new courses', link: '/admin/courses' },
  { label: 'Results Published', value: '245', icon: Award, color: 'bg-purple-500', change: '98% success rate', link: '/admin/results' },
  { label: 'Registered Users', value: '1,240', icon: Users, color: 'bg-pink-500', change: '+56 this month', link: '/admin/users' },
  { label: 'Files Uploaded', value: '89', icon: Upload, color: 'bg-cyan-500', change: '2.4 GB used', link: '/admin/uploads' },
];

const recentActivity = [
  { action: 'New notice published', detail: 'Mid-Term Examination Schedule', time: '2 hours ago', icon: Bell, color: 'text-amber-500' },
  { action: 'Course updated', detail: 'Computer Science & Engineering', time: '4 hours ago', icon: BookOpen, color: 'text-emerald-500' },
  { action: 'Results published', detail: '245 results for Class 10', time: '1 day ago', icon: Award, color: 'text-purple-500' },
  { action: 'New page created', detail: 'Admission Policy 2025', time: '2 days ago', icon: FileText, color: 'text-blue-500' },
  { action: 'File uploaded', detail: 'syllabus_2025.pdf', time: '3 days ago', icon: Upload, color: 'text-cyan-500' },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
          <p className="text-indigo-100 mb-4">Here's what's happening with your educational platform today.</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/notices"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/20 transition-colors border border-white/20"
            >
              <Bell className="w-4 h-4" /> Create Notice
            </Link>
            <Link
              to="/admin/pages"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              <FileText className="w-4 h-4" /> New Page
            </Link>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={stat.link}
              className="block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-4">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                className="p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <div className={`mt-0.5 ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick overview */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Quick Overview</h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: 'Published Pages', value: 10, total: 12, color: 'bg-blue-500' },
              { label: 'Active Notices', value: 8, total: 10, color: 'bg-amber-500' },
              { label: 'Published Courses', value: 6, total: 6, color: 'bg-emerald-500' },
              { label: 'Published Results', value: 245, total: 250, color: 'bg-purple-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-gray-900">
                    {item.value}/{item.total}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${item.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / item.total) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-900 mb-3">System Status</h4>
              <div className="space-y-2">
                {[
                  { label: 'Database', status: 'Online' },
                  { label: 'Storage', status: 'Active' },
                  { label: 'Auth Service', status: 'Running' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{s.label}</span>
                    <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
