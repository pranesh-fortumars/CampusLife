// Firebase configuration and initialization for CampusLife
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAH2spZvqHLOSsxJtReJOmM-oRvcTsAWsw",
  authDomain: "campuslife-9c2f1.firebaseapp.com",
  projectId: "campuslife-9c2f1",
  storageBucket: "campuslife-9c2f1.firebasestorage.app",
  messagingSenderId: "640927197072",
  appId: "1:640927197072:web:2d8d1281d1455f93deb515",
  measurementId: "G-Q5XG4DJRVK"
};

// Initialize Firebase (SSR safe)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics (only runs on client side when supported)
let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported: boolean) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, auth, db, storage, analytics, firebaseConfig };
