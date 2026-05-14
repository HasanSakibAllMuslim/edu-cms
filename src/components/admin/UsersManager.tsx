import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Shield, GraduationCap, UserCheck, Edit3, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { AppUser, UserRole } from '@/types';
import { formatDate } from '@/utils';
import Modal from '@/components/shared/Modal';

const initialUsers: AppUser[] = [
  { uid: '1', email: 'admin@educms.com', displayName: 'Admin User', role: 'admin', createdAt: new Date('2025-01-01') },
  { uid: '2', email: 'john@student.edu', displayName: 'John Smith', role: 'student', createdAt: new Date('2025-01-15') },
  { uid: '3', email: 'emma@student.edu', displayName: 'Emma Johnson', role: 'student', createdAt: new Date('2025-01-20') },
  { uid: '4', email: 'parent@family.com', displayName: 'Robert Smith Sr.', role: 'guardian', createdAt: new Date('2025-02-01') },
  { uid: '5', email: 'sarah@student.edu', displayName: 'Sarah Wilson', role: 'student', createdAt: new Date('2025-02-10') },
  { uid: '6', email: 'david@student.edu', displayName: 'David Park', role: 'student', createdAt: new Date('2025-02-15') },
];

const roleConfig: Record<UserRole, { icon: any; color: string; bg: string }> = {
  admin: { icon: Shield, color: 'text-red-700', bg: 'bg-red-50' },
  student: { icon: GraduationCap, color: 'text-blue-700', bg: 'bg-blue-50' },
  guardian: { icon: UserCheck, color: 'text-emerald-700', bg: 'bg-emerald-50' },
};

export default function UsersManager() {
  const [users, setUsers] = useState<AppUser[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [filterRole, setFilterRole] = useState<string>('all');

  const openEdit = (user: AppUser) => {
    setEditingUser(user);
    setSelectedRole(user.role);
  };

  const handleSaveRole = () => {
    if (!editingUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.uid === editingUser.uid ? { ...u, role: selectedRole } : u))
    );
    toast.success(`Role updated to ${selectedRole}`);
    setEditingUser(null);
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'all' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const roleCounts = {
    all: users.length,
    admin: users.filter((u) => u.role === 'admin').length,
    student: users.filter((u) => u.role === 'student').length,
    guardian: users.filter((u) => u.role === 'guardian').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-1">Manage user accounts and roles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'All Users', count: roleCounts.all, filter: 'all', icon: Users, color: 'bg-gray-100 text-gray-700' },
          { label: 'Admins', count: roleCounts.admin, filter: 'admin', icon: Shield, color: 'bg-red-50 text-red-700' },
          { label: 'Students', count: roleCounts.student, filter: 'student', icon: GraduationCap, color: 'bg-blue-50 text-blue-700' },
          { label: 'Guardians', count: roleCounts.guardian, filter: 'guardian', icon: UserCheck, color: 'bg-emerald-50 text-emerald-700' },
        ].map((stat) => (
          <button
            key={stat.filter}
            onClick={() => setFilterRole(stat.filter)}
            className={`p-4 rounded-xl text-left transition-all ${
              filterRole === stat.filter ? 'ring-2 ring-indigo-500 shadow-sm' : ''
            } ${stat.color}`}
          >
            <stat.icon className="w-5 h-5 mb-2" />
            <p className="text-2xl font-bold">{stat.count}</p>
            <p className="text-xs opacity-70">{stat.label}</p>
          </button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden sm:table-cell">Email</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-600">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden md:table-cell">Joined</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((user) => {
                const rc = roleConfig[user.role];
                const Icon = rc.icon;
                return (
                  <motion.tr key={user.uid} className="hover:bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-indigo-600 font-semibold text-sm">{user.displayName.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-gray-900">{user.displayName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{user.email}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${rc.bg} ${rc.color}`}>
                        <Icon className="w-3 h-3" /> {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{formatDate(user.createdAt)}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => openEdit(user)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Edit3 className="w-4 h-4 text-blue-500" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!editingUser} onClose={() => setEditingUser(null)} title="Change User Role" size="sm">
        {editingUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-bold">{editingUser.displayName.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{editingUser.displayName}</p>
                <p className="text-xs text-gray-500">{editingUser.email}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
              <div className="space-y-2">
                {(['admin', 'student', 'guardian'] as UserRole[]).map((role) => {
                  const rc = roleConfig[role];
                  const Icon = rc.icon;
                  return (
                    <label key={role} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedRole === role ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="radio" name="role" value={role} checked={selectedRole === role}
                        onChange={() => setSelectedRole(role)} className="w-4 h-4 text-indigo-600" />
                      <Icon className={`w-5 h-5 ${rc.color}`} />
                      <span className="text-sm font-medium text-gray-900 capitalize">{role}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button onClick={() => setEditingUser(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleSaveRole} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Role
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
