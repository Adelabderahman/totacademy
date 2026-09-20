/**
 * Admin Access Control Module for TOT Academy
 * Controls authorized admin privileges for the Content Studio / Control Panel (لوحة التحكم).
 * Default authorized master admin: abdo@gmail.com
 */

export const MASTER_ADMIN_EMAIL = 'abdo@gmail.com';

// Initial default list of authorized administrator emails
export const DEFAULT_ADMIN_EMAILS: string[] = [
  MASTER_ADMIN_EMAIL,
  // Add fallback or system admin if configured
  'profbillel23@gmail.com',
];

export const ADMIN_STORAGE_KEY = 'tot_academy_admin_emails';

/**
 * Checks if a given email has administrative privileges.
 * @param email The user's email address.
 * @param customAdmins Optional dynamic list of admin emails from Firestore/settings.
 */
export function checkIsAdmin(email?: string | null, customAdmins?: string[]): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  
  if (normalized === MASTER_ADMIN_EMAIL.toLowerCase()) {
    return true;
  }

  if (Array.isArray(customAdmins) && customAdmins.length > 0) {
    if (customAdmins.some((adm) => adm.trim().toLowerCase() === normalized)) {
      return true;
    }
  }

  // Check cached dynamic admin emails in localStorage if available in browser
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (cached) {
        const parsed: string[] = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.some((adm) => adm.trim().toLowerCase() === normalized)) {
          return true;
        }
      }
    } catch {
      // Ignore parse errors
    }
  }

  return DEFAULT_ADMIN_EMAILS.some((adm) => adm.trim().toLowerCase() === normalized);
}
