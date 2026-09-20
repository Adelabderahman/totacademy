'use client';

import React, { useState } from 'react';
import { AcademyEventItem } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';

export const EventsEditor: React.FC = () => {
  const { eventsList, saveEvent, deleteEvent } = useCurriculum();
  const [selectedEvent, setSelectedEvent] = useState<AcademyEventItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCreateNew = () => {
    const newId = `ev-${Date.now()}`;
    const newEv: AcademyEventItem = {
      id: newId,
      title: { ar: 'ورشة عمل تدريبية تفاعلية جديدة', en: 'New Interactive Workshop', fr: 'Nouvel Atelier' },
      date: '2026-10-15',
      time: '18:00 - 21:00 (GMT+1)',
      location: { ar: 'عن بُعد (قاعة زووم التفاعلية)', en: 'Online (Interactive Zoom Room)', fr: 'En Ligne (Zoom)' },
      mode: 'online',
      trainerName: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
      seats: 35,
      coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      desc: {
        ar: 'ورشة تطبيقية مكثفة تركز على المهارات الميدانية وبناء الحقائب التدريبية التفاعلية.',
        en: 'Intensive hands-on workshop focused on practical training skills.',
        fr: 'Atelier pratique intensif.',
      },
      status: 'upcoming',
      registrationUrl: 'https://sites.google.com/view/totacademya/totf126',
    };
    setSelectedEvent(newEv);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedEvent) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveEvent(selectedEvent);
      if (res.success) {
        setStatusMessage('✅ تم حفظ بيانات الفعالية بنجاح.');
        setIsEditing(false);
      } else {
        setStatusMessage(`❌ ${res.error || 'فشل الحفظ'}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ ${err.message || 'خطأ'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الفعالية؟')) return;
    await deleteEvent(id);
    if (selectedEvent?.id === id) {
      setIsEditing(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">إدارة الفعاليات والمواعيد (Events & Calendar)</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            إضافة وتعديل الورشات، المعسكرات، والأيام التدريبية المعروضة في صفحة الفعاليات.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
        >
          <span>+ إضافة فعالية جديدة</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold">
          {statusMessage}
        </div>
      )}

      {isEditing && selectedEvent ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 max-w-4xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h4 className="text-lg font-bold text-slate-900">
              {selectedEvent.title.ar || 'بيانات الفعالية'}
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
                {isSaving ? 'جاري الحفظ...' : 'حفظ الفعالية'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">عنوان الفعالية (عربي) *</label>
              <input
                type="text"
                value={selectedEvent.title.ar}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, title: { ...selectedEvent.title, ar: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">المدرب المشرف (عربي)</label>
              <input
                type="text"
                value={selectedEvent.trainerName.ar}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, trainerName: { ...selectedEvent.trainerName, ar: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">التاريخ</label>
              <input
                type="date"
                value={selectedEvent.date}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">نمط الحضور</label>
              <select
                value={selectedEvent.mode}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, mode: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value="online">عن بُعد (Online)</option>
                <option value="inperson">حضوري (In-Person)</option>
                <option value="hybrid">هجين (Hybrid)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">المقاعد المتاحة</label>
              <input
                type="number"
                value={selectedEvent.seats}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, seats: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">المكان أو الرابط (عربي)</label>
              <input
                type="text"
                value={selectedEvent.location.ar}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, location: { ...selectedEvent.location, ar: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">رابط الحجز المباشر</label>
              <input
                type="text"
                value={selectedEvent.registrationUrl || ''}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, registrationUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">الوصف والمحاور</label>
            <textarea
              rows={3}
              value={selectedEvent.desc.ar}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, desc: { ...selectedEvent.desc, ar: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm leading-relaxed"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventsList.map((ev) => (
            <div
              key={ev.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between gap-4 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-primary-blue bg-blue-50 px-2.5 py-0.5 rounded-full">
                    📅 {ev.date}
                  </span>
                  <span className="font-semibold text-slate-500 uppercase">
                    {ev.mode === 'online' ? '🌐 عن بُعد' : '🏢 حضوري'}
                  </span>
                </div>
                <h5 className="font-extrabold text-slate-900 text-base line-clamp-1 mb-1">
                  {ev.title.ar}
                </h5>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {ev.desc.ar}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">المقاعد: {ev.seats}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedEvent(ev);
                      setIsEditing(true);
                    }}
                    className="font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    تعديل ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="font-bold text-rose-600 hover:text-rose-800"
                  >
                    حذف 🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
