'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useUserAccount } from '@/context/UserAccountContext';
import { coreI18n } from '@/data/trainersData';
import CustomDropdown, { DropdownOption } from '@/components/ui/CustomDropdown';

const specialtiesList = [
  { ar: 'إدارة وتخطيط التدريب', en: 'Training Management & Planning', fr: 'Gestion et planification de la formation' },
  { ar: 'تصميم الحقائب التدريبية', en: 'Training Package Design', fr: 'Conception de kits de formation' },
  { ar: 'أساليب وأنشطة التدريب التفاعلي', en: 'Interactive Training Methods', fr: 'Méthodes de formation interactive' },
  { ar: 'تيسير الورش والندوات', en: 'Workshop Facilitation', fr: 'Facilitation d\'ateliers' },
  { ar: 'كوتشينغ وتطوير الأداء', en: 'Coaching & Performance Development', fr: 'Coaching et développement de la performance' },
  { ar: 'التدريب الإلكتروني والتعليم عن بعد', en: 'E-Learning & Digital Training', fr: 'Formation en ligne et e-learning' },
  { ar: 'القيادة وإدارة التغيير', en: 'Leadership & Change Management', fr: 'Leadership et gestion du changement' },
  { ar: 'تخصص آخر', en: 'Other Specialization', fr: 'Autre spécialité' },
];

interface JoinTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinTrainerModal({ isOpen, onClose }: JoinTrainerModalProps) {
  const { language } = useLanguage();
  const { user } = useUserAccount();
  const t = coreI18n[language] || coreI18n.ar;
  const isRTL = language === 'ar';

  const [country, setCountry] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [otherSpecialty, setOtherSpecialty] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape & trap scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset form on reopen
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validExtensions = ['pdf', 'doc', 'docx'];
    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    if (!validExtensions.includes(fileExt)) {
      setErrorMessage(
        language === 'ar'
          ? 'صيغة الملف غير مدعومة. يرجى رفع ملف PDF أو Word فقط.'
          : language === 'fr'
          ? 'Format non supporté. Veuillez téléverser un fichier PDF ou Word.'
          : 'Unsupported file format. Please upload a PDF or Word document.'
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(
        language === 'ar'
          ? 'حجم الملف يتجاوز الحد المسموح (10 ميغابايت).'
          : language === 'fr'
          ? 'Le fichier dépasse la taille maximale autorisée (10 Mo).'
          : 'File size exceeds the 10MB limit.'
      );
      return;
    }

    setErrorMessage('');
    setCvFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!country.trim() || !specialty) {
      setErrorMessage(t.form_required_alert);
      return;
    }

    if (!cvFile) {
      setErrorMessage(
        language === 'ar'
          ? 'يرجى تحميل السيرة الذاتية (CV) لإكمال الطلب.'
          : language === 'fr'
          ? 'Veuillez téléverser votre CV pour compléter la candidature.'
          : 'Please upload your CV/Resume to complete your application.'
      );
      return;
    }

    if (!agreedTerms) {
      setErrorMessage(
        language === 'ar'
          ? 'يرجى الموافقة على شروط الانضمام للمتابعة.'
          : language === 'fr'
          ? 'Veuillez accepter les conditions pour continuer.'
          : 'Please accept the terms to proceed.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const existing = JSON.parse(localStorage.getItem('tot_trainer_applications') || '[]');
      existing.push({
        id: `tr-app-${Date.now()}`,
        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
        userPhone: user?.phone,
        country,
        specialty: specialty === 'other' ? otherSpecialty : specialty,
        experienceYears,
        portfolioUrl,
        bio,
        appliedAt: new Date().toISOString(),
      });
      localStorage.setItem('tot_trainer_applications', JSON.stringify(existing));
    } catch {}

    // Simulate submission to server
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleResetAndClose = () => {
    setCountry('');
    setSpecialty('');
    setOtherSpecialty('');
    setExperienceYears('');
    setPortfolioUrl('');
    setCvFile(null);
    setBio('');
    setAgreedTerms(false);
    setIsSuccess(false);
    onClose();
  };

  const specialtiesList = [
    { key: 'tot', ar: 'إعداد وتدريب المدربين (TOT)', en: 'Training of Trainers (TOT)', fr: 'Formation des Formateurs (TOT)' },
    { key: 'tech', ar: 'تكنولوجيا والذكاء الاصطناعي والأمن السيبراني', en: 'Technology, AI & Cybersecurity', fr: 'Technologie, IA & Cybersécurité' },
    { key: 'marketing', ar: 'التسويق الرقمي وإدارة الأعمال والريادة', en: 'Digital Marketing & Business Management', fr: 'Marketing Digital & Gestion d\'Entreprise' },
    { key: 'media', ar: 'الإعلام والاتصال وصناعة المحتوى والمناظرات', en: 'Media, Communication & Content Creation', fr: 'Médias, Communication & Débats' },
    { key: 'consulting', ar: 'التطوير الإداري والاستشارات المؤسسية والجودة', en: 'Management Development & Institutional Consulting', fr: 'Développement Managérial & Conseil Institutionnel' },
    { key: 'soft_skills', ar: 'المهارات القيادية والشخصية والتفكير الاستراتيجي', en: 'Leadership, Soft Skills & Strategic Thinking', fr: 'Leadership, Soft Skills & Pensée Stratégique' },
    { key: 'other', ar: 'تخصص تدريبي آخر...', en: 'Other training specialization...', fr: 'Autre spécialité de formation...' }
  ];

  return (
    <div
      className="join-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
      id="join-trainer-modal-container"
    >
      <div className="join-modal-card" ref={modalRef} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Modal Close Button */}
        <button
          type="button"
          className="join-modal-close-btn"
          onClick={onClose}
          aria-label={t.close_aria}
          id="close-join-modal"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="join-modal-success" id="join-trainer-success-message">
            <div className="success-icon-badge">✓</div>
            <h3>{t.form_success_title}</h3>
            <p className="success-lead">{t.form_success_desc}</p>
            <div className="success-summary-box">
              <div className="summary-item">
                <span className="summary-label">{t.form_name_label}:</span>
                <span className="summary-value">{user?.name || (language === 'ar' ? 'عضو الأكاديمية' : 'Academy Member')}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">{t.form_specialty_label}:</span>
                <span className="summary-value">{specialty === 'other' ? otherSpecialty : specialty}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">{t.form_cv_selected}</span>
                <span className="summary-value cv-name">{cvFile?.name}</span>
              </div>
            </div>
            <button
              type="button"
              className="join-modal-btn primary"
              onClick={handleResetAndClose}
              id="join-modal-done-btn"
            >
              {t.form_close_btn}
            </button>
          </div>
        ) : (
          <>
            <div className="join-modal-header">
              <h2 id="join-modal-title">{t.join_modal_title}</h2>
            </div>

            {/* Authenticated User Account Card */}
            <div className="flex items-center gap-3 p-3.5 mb-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 text-blue-950">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shrink-0 shadow-sm">
                {user?.name ? user.name.trim().charAt(0) : '✓'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-blue-700 font-bold">
                    {language === 'ar' ? 'التقديم بالحساب المعتمد:' : 'Applying with verified account:'}
                  </span>
                  <span className="text-xs font-black text-blue-950 truncate">
                    {user?.name || (language === 'ar' ? 'عضو الأكاديمية' : 'Academy Member')}
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    ✓ {language === 'ar' ? 'حساب موثق' : 'Verified'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  <span>{user?.email || 'member@tot-academy.org'}</span>
                  {user?.phone ? <span className="mx-1">• {user.phone}</span> : null}
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="join-modal-alert" role="alert">
                ⚠️ {errorMessage}
              </div>
            )}

            <form className="join-modal-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid-2col-3row">
                {/* 1. Country / Province */}
                <div className="form-group">
                  <label htmlFor="join-country">
                    {t.form_country_label} <span className="req">*</span>
                  </label>
                  <input
                    id="join-country"
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={t.form_country_placeholder}
                    className="form-input"
                  />
                </div>

                {/* 2. Specialization */}
                <div>
                  <CustomDropdown
                    id="join-specialty"
                    label={t.form_specialty_label}
                    required
                    value={specialty}
                    onChange={setSpecialty}
                    options={specialtiesList.map((item) => ({
                      value: item[language as keyof typeof item] || item.ar,
                      label: item[language as keyof typeof item] || item.ar,
                      icon: '🎯',
                    }))}
                    placeholder={t.form_specialty_select}
                    showSearch={true}
                    searchPlaceholder={language === 'ar' ? 'ابحث عن تخصص...' : 'Search specialty...'}
                    themeColor="blue"
                    centerModal={true}
                    dropdownWidthClass="w-full min-w-[270px] sm:min-w-[320px]"
                  />
                </div>

                {/* 3. Years of Experience */}
                <div>
                  <CustomDropdown
                    id="join-experience"
                    label={t.form_exp_label}
                    value={experienceYears}
                    onChange={setExperienceYears}
                    options={[
                      { value: '<3', label: t.form_exp_1, icon: '🌱' },
                      { value: '3-5', label: t.form_exp_2, icon: '⭐' },
                      { value: '5-10', label: t.form_exp_3, icon: '🏆' },
                      { value: '>10', label: t.form_exp_4, icon: '👑' },
                    ]}
                    placeholder={t.form_exp_select}
                    themeColor="blue"
                    dropdownWidthClass="w-full min-w-[240px] sm:min-w-[280px]"
                  />
                </div>

                {/* 4. Portfolio / LinkedIn */}
                <div className="form-group">
                  <label htmlFor="join-portfolio">
                    {t.form_portfolio_label}
                  </label>
                  <input
                    id="join-portfolio"
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder={t.form_portfolio_placeholder}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Other Specialization if chosen */}
              {specialty.includes('آخر') || specialty.includes('Other') || specialty.includes('Autre') ? (
                <div className="form-group">
                  <label htmlFor="join-other-specialty">
                    {language === 'ar' ? 'حدد تخصصك التدريبي بالتفصيل' : 'Specify your training specialization'}
                  </label>
                  <input
                    id="join-other-specialty"
                    type="text"
                    value={otherSpecialty}
                    onChange={(e) => setOtherSpecialty(e.target.value)}
                    placeholder={language === 'ar' ? 'اكتب اسم تخصصك التدريبي الدقيق...' : 'Enter your specific field...'}
                    className="form-input"
                  />
                </div>
              ) : null}

              {/* Upload CV Dropzone */}
              <div className="form-group">
                <label className="form-label-block">
                  {t.form_cv_label} <span className="req">*</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="file-input-hidden"
                  id="join-cv-file"
                />

                {!cvFile ? (
                  <div
                    className={`cv-dropzone ${isDraggingFile ? 'dragging' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    <div className="dropzone-icon">📄</div>
                    <div className="dropzone-text">
                      <b>{t.form_cv_label}</b>
                      <span>{t.form_cv_hint}</span>
                    </div>
                  </div>
                ) : (
                  <div className="cv-selected-card">
                    <div className="cv-icon">📎</div>
                    <div className="cv-info">
                      <span className="cv-name">{cvFile.name}</span>
                      <span className="cv-size">
                        {(cvFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                    <button
                      type="button"
                      className="cv-remove-btn"
                      onClick={() => setCvFile(null)}
                      title={t.form_cv_remove}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Bio & Achievements */}
              <div className="form-group">
                <label htmlFor="join-bio">
                  {t.form_bio_label}
                </label>
                <textarea
                  id="join-bio"
                  rows={8}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={t.form_bio_placeholder}
                  className="form-textarea"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="form-group-checkbox">
                <label className="checkbox-label" htmlFor="join-terms">
                  <input
                    id="join-terms"
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    required
                  />
                  <span>{t.form_terms_label}</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="join-modal-btn primary submit-btn"
                  id="submit-join-trainer-form"
                >
                  {isSubmitting ? (
                    <>
                      <span className="btn-spinner" />
                      <span>{t.form_submitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.form_submit_btn}</span>
                      <Send size={18} className="telegram-send-icon" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
