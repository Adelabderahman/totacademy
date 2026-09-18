'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { coreI18n } from '@/data/trainersData';

interface JoinTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinTrainerModal({ isOpen, onClose }: JoinTrainerModalProps) {
  const { language } = useLanguage();
  const t = coreI18n[language] || coreI18n.ar;
  const isRTL = language === 'ar';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

    if (!fullName.trim() || !email.trim() || !phone.trim() || !country.trim() || !specialty) {
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

    // Simulate submission to server
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setFullName('');
    setEmail('');
    setPhone('');
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
                <span className="summary-value">{fullName}</span>
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
              <div className="modal-header-badge">
                <span>✨</span> TOT ACADEMY
              </div>
              <h2 id="join-modal-title">{t.join_modal_title}</h2>
              <p className="join-modal-subtitle">{t.join_modal_subtitle}</p>
            </div>

            {errorMessage && (
              <div className="join-modal-alert" role="alert">
                ⚠️ {errorMessage}
              </div>
            )}

            <form className="join-modal-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid-2">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="join-full-name">
                    {t.form_name_label} <span className="req">*</span>
                  </label>
                  <input
                    id="join-full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.form_name_placeholder}
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="join-email">
                    {t.form_email_label} <span className="req">*</span>
                  </label>
                  <input
                    id="join-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.form_email_placeholder}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                {/* WhatsApp / Phone */}
                <div className="form-group">
                  <label htmlFor="join-phone">
                    {t.form_phone_label} <span className="req">*</span>
                  </label>
                  <input
                    id="join-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.form_phone_placeholder}
                    className="form-input"
                  />
                </div>

                {/* Country / Province */}
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
              </div>

              <div className="form-grid-2">
                {/* Specialization */}
                <div className="form-group">
                  <label htmlFor="join-specialty">
                    {t.form_specialty_label} <span className="req">*</span>
                  </label>
                  <select
                    id="join-specialty"
                    required
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="form-select"
                  >
                    <option value="">{t.form_specialty_select}</option>
                    {specialtiesList.map((item) => (
                      <option key={item.key} value={item[language as keyof typeof item] || item.ar}>
                        {item[language as keyof typeof item] || item.ar}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Years of Experience */}
                <div className="form-group">
                  <label htmlFor="join-experience">
                    {t.form_exp_label}
                  </label>
                  <select
                    id="join-experience"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="form-select"
                  >
                    <option value="">{t.form_exp_select}</option>
                    <option value="<3">{t.form_exp_1}</option>
                    <option value="3-5">{t.form_exp_2}</option>
                    <option value="5-10">{t.form_exp_3}</option>
                    <option value=">10">{t.form_exp_4}</option>
                  </select>
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

              {/* LinkedIn / Portfolio URL */}
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
                  rows={3}
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
                      <span className="btn-icon">🚀</span>
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
