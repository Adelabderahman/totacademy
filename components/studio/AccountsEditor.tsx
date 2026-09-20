'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/context/CurriculumContext';
import { MASTER_ADMIN_EMAIL } from '@/lib/adminAccess';
import { useUserAccount } from '@/context/UserAccountContext';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'trainer' | 'trainee';
  enrolledTracksCount: number;
  registeredAt: string;
  status: 'active' | 'suspended';
}

export const AccountsEditor: React.FC = () => {
  const { adminEmails, addAdminEmail, removeAdminEmail } = useCurriculum();
  const { user } = useUserAccount();

  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminActionStatus, setAdminActionStatus] = useState<string | null>(null);

  // Mock / Cached users list for platform directory
  const [usersList, setUsersList] = useState<UserItem[]>([
    {
      id: 'usr-1',
      name: 'عبد الكريم بلخيري (المشرف العام)',
      email: MASTER_ADMIN_EMAIL,
      role: 'admin',
      enrolledTracksCount: 5,
      registeredAt: '2025-01-10',
      status: 'active',
    },
    {
      id: 'usr-2',
      name: 'سفيان مزيان',
      email: 'sofiane.m@tot-academy.dz',
      role: 'trainer',
      enrolledTracksCount: 3,
      registeredAt: '2025-02-14',
      status: 'active',
    },
    {
      id: 'usr-3',
      name: 'فاطمة الزهراء قاسمي',
      email: 'fatima.q@tot-academy.dz',
      role: 'trainer',
      enrolledTracksCount: 2,
      registeredAt: '2025-03-01',
      status: 'active',
    },
    {
      id: 'usr-4',
      name: 'محمد أمين بلقاسم',
      email: 'amine.belkacem@gmail.com',
      role: 'trainee',
      enrolledTracksCount: 1,
      registeredAt: '2025-04-12',
      status: 'active',
    },
    {
      id: 'usr-5',
      name: 'إيمان حيدوسي',
      email: 'imane.h@yahoo.fr',
      role: 'trainee',
      enrolledTracksCount: 2,
      registeredAt: '2025-05-18',
      status: 'active',
    },
  ]);

  const [searchUser, setSearchUser] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'trainer' | 'trainee'>('all');

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;

    setAdminActionStatus(null);
    const res = await addAdminEmail(newAdminEmail.trim());
    if (res.success) {
      setAdminActionStatus(`✅ تمت إضافة البريد (${newAdminEmail}) كمشرف بنجاح.`);
      setNewAdminEmail('');
    } else {
      setAdminActionStatus(`❌ ${res.error || 'فشلت إضافة المشرف'}`);
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    if (email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase()) {
      alert('لا يمكن حذف المشرف الرئيسي والمؤسس!');
      return;
    }

    if (confirm(`هل أنت متأكد من إزالة صلاحيات الإشراف عن: ${email}؟`)) {
      setAdminActionStatus(null);
      const res = await removeAdminEmail(email);
      if (res.success) {
        setAdminActionStatus(`✅ تم سحب صلاحية الإشراف عن (${email}).`);
      } else {
        setAdminActionStatus(`❌ ${res.error || 'فشل سحب الصلاحية'}`);
      }
    }
  };

  const handleToggleUserRole = (userId: string, newRole: 'admin' | 'trainer' | 'trainee') => {
    setUsersList(usersList.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsersList(
      usersList.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
      )
    );
  };

  const filteredUsers = usersList.filter((u) => {
    const matchQuery =
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase());
    const matchRole = filterRole === 'all' || u.role === filterRole;
    return matchQuery && matchRole;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <span>👥 إدارة الحسابات والصلاحيات (Accounts & RBAC)</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {usersList.length} مستخدم مسجل
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            التحكم في قائمة المشرفين المعتمدين، أدوار المدربين، والمتدربين المسجلين في الأكاديمية.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">حسابك الحالي:</span>
          <span className="font-mono font-bold text-amber-400">{user?.email || MASTER_ADMIN_EMAIL}</span>
        </div>
      </div>

      {/* Admin Emails Management */}
      <div className="bg-slate-800/50 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h4 className="font-extrabold text-sm text-amber-400 flex items-center gap-2">
          <span>🛡️ قائمة المشرفين المصرح لهم بالدخول إلى استوديو الإدارة (Admins):</span>
        </h4>

        {adminActionStatus && (
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold">
            {adminActionStatus}
          </div>
        )}

        {/* Add Admin Form */}
        <form onSubmit={handleAddAdmin} className="flex gap-2 max-w-md">
          <input
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            placeholder="أدخل بريد المشرف الجديد..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all"
          >
            + منح صلاحية مشرف
          </button>
        </form>

        {/* Active Admins Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {adminEmails.map((email) => {
            const isMaster = email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
            return (
              <div
                key={email}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs ${
                  isMaster
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-300 font-bold'
                    : 'border-slate-700 bg-slate-800/80 text-slate-200'
                }`}
              >
                <span className="font-mono">{email}</span>
                {isMaster ? (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500 text-slate-950 font-extrabold">
                    المشرف الرئيسي
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRemoveAdmin(email)}
                    className="p-1 text-rose-400 hover:text-rose-300 font-bold"
                    title="سحب الصلاحية"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
            <span>📋 دليل مستخدمي المنصة وحساباتهم:</span>
          </h4>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="ابحث بالاسم أو البريد..."
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
            />

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none"
            >
              <option value="all">كل الرتب</option>
              <option value="admin">مشرف (Admin)</option>
              <option value="trainer">مدرب (Trainer)</option>
              <option value="trainee">متدرب (Trainee)</option>
            </select>
          </div>
        </div>

        {/* Table Container with inner scroll */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700">
              <tr>
                <th className="p-3">المستخدم</th>
                <th className="p-3">البريد الإلكتروني</th>
                <th className="p-3">الرتبة</th>
                <th className="p-3">المسارات</th>
                <th className="p-3">تاريخ التسجيل</th>
                <th className="p-3">الحالة</th>
                <th className="p-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-bold text-white">{u.name}</td>
                  <td className="p-3 font-mono text-slate-300">{u.email}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleToggleUserRole(u.id, e.target.value as any)}
                      className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-white text-[11px] focus:outline-none"
                    >
                      <option value="trainee">متدرب</option>
                      <option value="trainer">مدرب معتمد</option>
                      <option value="admin">مشرف منصة</option>
                    </select>
                  </td>
                  <td className="p-3 text-slate-400 font-mono">{u.enrolledTracksCount} مسارات</td>
                  <td className="p-3 text-slate-400 font-mono">{u.registeredAt}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'active'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {u.status === 'active' ? 'نشط' : 'معلّق'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleUserStatus(u.id)}
                      className="text-[11px] text-slate-400 hover:text-amber-400 font-semibold underline"
                    >
                      {u.status === 'active' ? 'تعليق الحساب' : 'إلغاء التعليق'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
