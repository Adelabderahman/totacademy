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
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfigJson from '@/firebase-applet-config.json';
import {
  UserProfile,
  EnrolledTrack,
  UserCertificate,
  UserAppointment,
  ConfirmedEnrollmentRecord,
} from '@/types/user';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo:
        auth?.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

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
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let googleProvider: GoogleAuthProvider | undefined;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  try {
    // Try custom database ID if available
    db =
      firestoreDbId && firestoreDbId !== '(default)'
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

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);

export { app, auth, db, googleProvider };

// Connection test on boot as required by Firebase skill
if (typeof window !== 'undefined' && db && isFirebaseConfigured) {
  (async function testConnection() {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if (error instanceof Error && error.message.includes('the client is offline')) {
        console.warn('Firebase connection check: client is offline or network restricted.');
      }
    }
  })();
}

// --- Profile & Database Helpers ---

export async function fetchUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  if (!db || !uid) return null;
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
  return null;
}

export async function saveUserProfileToFirestore(profile: UserProfile): Promise<void> {
  if (!db || !profile.id) return;
  const path = `users/${profile.id}`;
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
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function fetchUserEnrolledTracks(uid: string): Promise<EnrolledTrack[]> {
  if (!db || !uid) return [];
  const path = `users/${uid}/enrolledTracks`;
  try {
    const tracksColl = collection(db, 'users', uid, 'enrolledTracks');
    const snap = await getDocs(tracksColl);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EnrolledTrack));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function saveEnrolledTrackToFirestore(uid: string, track: EnrolledTrack): Promise<void> {
  if (!db || !uid || !track.id) return;
  const path = `users/${uid}/enrolledTracks/${track.id}`;
  try {
    const trackRef = doc(db, 'users', uid, 'enrolledTracks', track.id);
    await setDoc(trackRef, track, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export interface TrackProgressRecord {
  trackKey: string;
  userId: string;
  activeLevel: 'foundation' | 'empowerment' | 'consolidation';
  activeModuleId: string;
  completedLessons: Record<string, string[]>;
  completedQuizzes: Record<string, string[]>;
  overallProgress: number;
  reportCode?: string;
  lastUpdated: string;
}

export async function fetchTrackProgressFromFirestore(
  uid: string,
  trackKey: string
): Promise<TrackProgressRecord | null> {
  if (!db || !uid || !trackKey) return null;
  const path = `users/${uid}/trackProgress/${trackKey}`;
  try {
    const progressRef = doc(db, 'users', uid, 'trackProgress', trackKey);
    const snap = await getDoc(progressRef);
    if (snap.exists()) {
      return snap.data() as TrackProgressRecord;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
  return null;
}

export async function saveTrackProgressToFirestore(
  uid: string,
  trackKey: string,
  data: Partial<TrackProgressRecord>
): Promise<void> {
  if (!db || !uid || !trackKey) return;
  const path = `users/${uid}/trackProgress/${trackKey}`;
  try {
    const progressRef = doc(db, 'users', uid, 'trackProgress', trackKey);
    await setDoc(
      progressRef,
      {
        ...data,
        trackKey,
        userId: uid,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteTrackProgressFromFirestore(uid: string, trackKey: string): Promise<void> {
  if (!db || !uid || !trackKey) return;
  const path = `users/${uid}/trackProgress/${trackKey}`;
  try {
    const progressRef = doc(db, 'users', uid, 'trackProgress', trackKey);
    await deleteDoc(progressRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function deleteEnrolledTrackFromFirestore(uid: string, trackId: string): Promise<void> {
  if (!db || !uid || !trackId) return;
  const path = `users/${uid}/enrolledTracks/${trackId}`;
  try {
    const trackRef = doc(db, 'users', uid, 'enrolledTracks', trackId);
    await deleteDoc(trackRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- Confirmed Enrollments (الملف الثاني لتأكيد التسجيل في المسار وحفظ نسخة كاملة) ---

export async function fetchUserConfirmedEnrollments(uid: string): Promise<ConfirmedEnrollmentRecord[]> {
  if (!db || !uid) return [];
  const path = `users/${uid}/confirmedEnrollments`;
  try {
    const collRef = collection(db, 'users', uid, 'confirmedEnrollments');
    const snap = await getDocs(collRef);
    return snap.docs.map((d) => d.data() as ConfirmedEnrollmentRecord);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function fetchConfirmedEnrollment(
  uid: string,
  trackKey: string
): Promise<ConfirmedEnrollmentRecord | null> {
  if (!db || !uid || !trackKey) return null;
  const path = `users/${uid}/confirmedEnrollments/${trackKey}`;
  try {
    const docRef = doc(db, 'users', uid, 'confirmedEnrollments', trackKey);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as ConfirmedEnrollmentRecord;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
  return null;
}

export async function saveConfirmedEnrollmentToFirestore(
  uid: string,
  record: ConfirmedEnrollmentRecord
): Promise<void> {
  if (!db || !uid || !record.trackKey) return;
  const path = `users/${uid}/confirmedEnrollments/${record.trackKey}`;
  try {
    const docRef = doc(db, 'users', uid, 'confirmedEnrollments', record.trackKey);
    await setDoc(docRef, {
      ...record,
      confirmedAt: record.confirmedAt || new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function fetchUserCertificatesFromFirestore(uid: string): Promise<UserCertificate[]> {
  if (!db || !uid) return [];
  const path = `users/${uid}/certificates`;
  try {
    const certColl = collection(db, 'users', uid, 'certificates');
    const snap = await getDocs(certColl);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserCertificate));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function fetchUserAppointmentsFromFirestore(uid: string): Promise<UserAppointment[]> {
  if (!db || !uid) return [];
  const path = `users/${uid}/appointments`;
  try {
    const apptColl = collection(db, 'users', uid, 'appointments');
    const snap = await getDocs(apptColl);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserAppointment));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}
