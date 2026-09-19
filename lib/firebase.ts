import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfigJson from '@/firebase-applet-config.json';
import { UserProfile, EnrolledTrack } from '@/types/user';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfigJson.apiKey || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || firebaseConfigJson.authDomain || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseConfigJson.projectId || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || firebaseConfigJson.storageBucket || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigJson.messagingSenderId || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || firebaseConfigJson.appId || '',
};

const firestoreDbId =
  process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_DATABASE_ID ||
  firebaseConfigJson.firestoreDatabaseId ||
  '(default)';

// Singleton initialization pattern
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let googleProvider: GoogleAuthProvider;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  try {
    // Try custom database ID if available
    db = firestoreDbId && firestoreDbId !== '(default)'
      ? getFirestore(app, firestoreDbId)
      : getFirestore(app);
  } catch {
    db = getFirestore(app);
  }
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
} catch (err) {
  console.warn('Firebase initialization note:', err);
}

export { app, auth, db, googleProvider };

// --- Profile & Database Helpers ---

export async function fetchUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  if (!db) return null;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (error) {
    console.warn('Firestore fetch user profile note:', error);
  }
  return null;
}

export async function saveUserProfileToFirestore(profile: UserProfile): Promise<void> {
  if (!db || !profile.id) return;
  try {
    const userDocRef = doc(db, 'users', profile.id);
    await setDoc(
      userDocRef,
      {
        ...profile,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Firestore save user profile error:', error);
    throw error;
  }
}

export async function saveEnrolledTrackToFirestore(uid: string, track: EnrolledTrack): Promise<void> {
  if (!db || !uid) return;
  try {
    const trackRef = doc(db, 'users', uid, 'enrolledTracks', track.id);
    await setDoc(trackRef, track, { merge: true });
  } catch (error) {
    console.warn('Firestore save enrolled track error:', error);
  }
}
