/**
 * @module config/firebase
 * @description Firebase app initialization and service exports.
 * All Firebase services are initialized here and exported as singletons.
 * Import the specific service you need — never call initializeApp() elsewhere.
 * @version 1.0.0
 */
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { ENV } from './env';

const firebaseConfig = {
  apiKey:            ENV.firebase.apiKey,
  authDomain:        ENV.firebase.authDomain,
  projectId:         ENV.firebase.projectId,
  storageBucket:     ENV.firebase.storageBucket,
  messagingSenderId: ENV.firebase.messagingSenderId,
  appId:             ENV.firebase.appId,
  measurementId:     ENV.firebase.measurementId,
};

export const app: FirebaseApp  = initializeApp(firebaseConfig);
export const db: Firestore     = getFirestore(app);
export const auth: Auth        = getAuth(app);
export const analytics: Analytics = getAnalytics(app);
