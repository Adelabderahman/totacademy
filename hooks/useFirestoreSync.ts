'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';

export function useFirestoreSync<T>(
  collectionName: string,
  documentId: string,
  initialData: T
) {
  const [data, setData] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(`cms_${collectionName}_${documentId}`);
        if (cached) return JSON.parse(cached);
      } catch {
        // ignore storage errors
      }
    }
    return initialData;
  });
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return Boolean(isFirebaseConfigured);
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!db || !isFirebaseConfigured) {
      if (isMounted) setIsLoading(false);
      return;
    }

    try {
      const docRef = doc(db, collectionName, documentId);

      // Real-time listener for multi-client and CMS updates
      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (!isMounted) return;

          if (snapshot.exists()) {
            const remoteData = snapshot.data() as T;
            setData(remoteData);
            if (typeof window !== 'undefined') {
              try {
                localStorage.setItem(`cms_${collectionName}_${documentId}`, JSON.stringify(remoteData));
              } catch {
                // ignore
              }
            }
          } else {
            // Seed the document on first run
            setDoc(docRef, initialData as any, { merge: true }).catch((err) => {
              console.warn('Initial seeding note:', err.message);
            });
          }
          setIsLoading(false);
        },
        (err) => {
          if (!isMounted) return;
          console.warn('Firestore offline/fallback mode active:', err.message);
          setError(err.message);
          setIsLoading(false);
        }
      );

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } catch (err: any) {
      if (isMounted) {
        console.warn('Firestore client initialization fallback:', err.message);
        setIsLoading(false);
      }
    }
  }, [collectionName, documentId, initialData]);

  // Mutation function to commit live edits back to Firestore
  const mutate = useCallback(
    async (updatedFields: Partial<T>) => {
      const updatedState = { ...data, ...updatedFields };
      setData(updatedState);

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(`cms_${collectionName}_${documentId}`, JSON.stringify(updatedState));
        } catch {
          // ignore
        }
      }

      if (!db || !isFirebaseConfigured) {
        return;
      }

      try {
        const docRef = doc(db, collectionName, documentId);
        await setDoc(docRef, updatedState as any, { merge: true });
      } catch (err: any) {
        console.error('Failed to sync changes with Firestore:', err);
        throw err;
      }
    },
    [collectionName, documentId, data]
  );

  return { data, isLoading, error, mutate };
}