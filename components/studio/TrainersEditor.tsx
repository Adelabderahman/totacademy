'use client';

import React, { useState } from 'react';
import { TrainerDirectoryItem } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';

export const TrainersEditor: React.FC = () => {
  const { trainersList, saveTrainer, deleteTrainer } = useCurriculum();
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerDirectoryItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleCreateNew = () => {
    const newId = `trainer-${Date.now()}`;
    const newTrainer: TrainerDirectoryItem = {
      id: newId,
      name: { ar: 'مدرب معتمد جديد', en: 'New Certified Trainer', fr: 'Nouveau Formateur' },
      role: { ar: 'خبير تدريب دولي ومستشار معتمد', en: 'International Master Trainer', fr: 'Maître Formateur' },
      category: 'tot',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      country: 'الجزائر',
      languages: ['العربية', 'Français'],
      bio: {
        ar: 'خبير واستشاري معتمد في تأهيل المدربين وتصميم الحقائب التدريبية التفاعلية.',
        en: 'Certified consultant and trainer in TOT and interactive instructional design.',
        fr: 'Consultant et formateur certifié.',
      },
      email: 'trainer@tot-academy.org',
      phone: '+213 555 000 000',
    };
    setSelectedTrainer(newTrainer);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedTrainer) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveTrainer(selectedTrainer);
      if (res.success) {
        setStatusMessage('✅ تم حفظ بيانات المدرب بنجاح في قاعدة البيانات.');
        setIsEditing(false);
      } else {
        setStatusMessage(`❌ ${res.error || 'فشل الحفظ'}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ ${err.message || 'حدث خطأ غير متوقع'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المدرب من دليل المنصة؟')) return;
    await deleteTrainer(id);
    if (selectedTrainer?.id === id) {
      setIsEditing(false);
      setSelectedTrainer(null);
    }
  };

  const filteredTrainers = trainersList.filter((tr) =>
    tr.name.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tr.role.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tr.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">دليل نخبة المدربين والمستشارين</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            إدارة وتحديث قائمة المدربين المعتمدين في صفحة المدربين وفي القوائم المنسدلة للمسارات التدريبية.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
        >
          <span>+ إضافة مدرب جديد للمنصة</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold">
          {statusMessage}
        </div>
      )}

      {/* Editor or List */}
      {isEditing && selectedTrainer ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 max-w-4xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h4 className="text-lg font-bold text-slate-900">
              {selectedTrainer.name.ar || 'بيانات المدرب'}
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
              >
                {isSaving ? 'جاري الحفظ...' : 'حفظ البيانات'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">اسم المدرب (عربي) *</label>
              <input
                type="text"
                value={selectedTrainer.name.ar}
                onChange={(e) => setSelectedTrainer({ ...selectedTrainer, name: { ...selectedTrainer.name, ar: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">اسم المدرب (إنجليزي)</label>
              <input
                type="text"
                value={selectedTrainer.name.en}
                onChange={(e) => setSelectedTrainer({ ...selectedTrainer, name: { ...selectedTrainer.name, en: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">الصفة واللقب المهني (عربي) *</label>
              <input
                type="text"
                value={selectedTrainer.role.ar}
                onChange={(e) => setSelectedTrainer({ ...selectedTrainer, role: { ...selectedTrainer.role, ar: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">البلد / الدولة</label>
              <input
                type="text"
                value={selectedTrainer.country}
                onChange={(e) => setSelectedTrainer({ ...selectedTrainer, country: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">رابط الصورة الشخصية (URL)</label>
              <input
                type="text"
                value={selectedTrainer.image}
                onChange={(e) => setSelectedTrainer({ ...selectedTrainer, image: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">رقم الهاتف / الواتساب</label>
              <input
                type="text"
                value={selectedTrainer.phone || ''}
                onChange={(e) => setSelectedTrainer({ ...selectedTrainer, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">النبذة المهنية والإنجازات</label>
            <textarea
              rows={3}
              value={selectedTrainer.bio.ar}
              onChange={(e) => setSelectedTrainer({ ...selectedTrainer, bio: { ...selectedTrainer.bio, ar: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm leading-relaxed"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="🔍 ابحث عن مدرب بالاسم أو اللقب أو البلد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm w-full max-w-md bg-white"
            />
            <span className="text-xs text-slate-500 font-semibold">
              إجمالي المدربين: {trainersList.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrainers.map((tr) => (
              <div
                key={tr.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={tr.image}
                    alt={tr.name.ar}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-extrabold text-slate-900 text-sm truncate">{tr.name.ar}</h5>
                    <p className="text-xs text-slate-500 line-clamp-1">{tr.role.ar}</p>
                    <span className="inline-block mt-1 text-[11px] font-bold text-primary-blue bg-blue-50 px-2 py-0.5 rounded-md">
                      📍 {tr.country}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setSelectedTrainer(tr);
                      setIsEditing(true);
                    }}
                    className="font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    تعديل البيانات ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(tr.id)}
                    className="font-bold text-rose-600 hover:text-rose-800"
                  >
                    حذف 🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
