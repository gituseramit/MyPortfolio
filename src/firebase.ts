import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  getDocFromServer,
  serverTimestamp,
  increment 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// CRITICAL: Must supply firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

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
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test initial connection as required by skill guidelines
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'project_reactions', 'init_test'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline or connecting...');
    }
  }
}

// Submit contact message directly to Firestore
export async function saveContactMessage(name: string, email: string, subject: string, message: string) {
  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const path = `contact_messages/${messageId}`;
  try {
    await setDoc(doc(db, 'contact_messages', messageId), {
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      createdAt: serverTimestamp()
    });
    return { success: true, messageId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return { success: false, error };
  }
}

// Get or increment project reaction / like
export async function toggleProjectLike(projectId: string): Promise<number> {
  const path = `project_reactions/${projectId}`;
  try {
    const docRef = doc(db, 'project_reactions', projectId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      await setDoc(docRef, {
        projectId,
        likesCount: 1,
        lastUpdated: serverTimestamp()
      });
      return 1;
    } else {
      const currentCount = snap.data().likesCount || 0;
      await setDoc(docRef, {
        projectId,
        likesCount: currentCount + 1,
        lastUpdated: serverTimestamp()
      }, { merge: true });
      return currentCount + 1;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return 0;
  }
}
