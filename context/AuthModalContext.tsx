'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AuthModalMode = 'prompt' | 'login' | 'register';

export interface PendingEnrollTrack {
  id: string;
  trackKey: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  mentorName?: string;
  badge?: string;
}

interface AuthModalContextType {
  isOpen: boolean;
  mode: AuthModalMode;
  redirectUrl?: string | null;
  customMessage?: string | null;
  pendingTrack?: PendingEnrollTrack | null;
  openAuthModal: (
    initialMode?: AuthModalMode,
    redirectUrl?: string | null,
    customMessage?: string | null,
    pendingTrack?: PendingEnrollTrack | null
  ) => void;
  closeAuthModal: () => void;
  setMode: (mode: AuthModalMode) => void;
  clearRedirectData: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthModalMode>('register');
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState<string | null>(null);
  const [pendingTrack, setPendingTrack] = useState<PendingEnrollTrack | null>(null);

  const openAuthModal = (
    initialMode: AuthModalMode = 'register',
    targetRedirectUrl?: string | null,
    targetMessage?: string | null,
    targetTrack?: PendingEnrollTrack | null
  ) => {
    setMode(initialMode);
    setRedirectUrl(targetRedirectUrl || null);
    setCustomMessage(targetMessage || null);
    setPendingTrack(targetTrack || null);
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
  };

  const clearRedirectData = () => {
    setRedirectUrl(null);
    setCustomMessage(null);
    setPendingTrack(null);
  };

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        mode,
        redirectUrl,
        customMessage,
        pendingTrack,
        openAuthModal,
        closeAuthModal,
        setMode,
        clearRedirectData,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};
