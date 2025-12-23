// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChMaEuJpAWtfh3TF1mDZG70zwIst240_A",
  // IMPORTANT: authDomain MUST be the Firebase app domain (projectId.firebaseapp.com)
  // Do NOT use a custom domain here (e.g., finsight.analytx4t.com)
  // Firebase handles OAuth redirects internally using this domain
  authDomain: "inner-doodad-461919-n6.firebaseapp.com",
  projectId: "inner-doodad-461919-n6",
  storageBucket: "inner-doodad-461919-n6.firebasestorage.app",
  messagingSenderId: "874941246241",
  appId: "1:874941246241:web:f3bed2d140c8f6f88fac60",
  measurementId: "G-500PV15W2J"
};

// Initialize Firebase (prevent duplicate initialization during HMR)
let app;
try {
  app = getApp();
} catch (error) {
  app = initializeApp(firebaseConfig);
}

// Initialize Analytics (only in browser environment)
let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    // Analytics already initialized
    console.warn("Analytics initialization warning:", error.message);
  }
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export { app, analytics };
export default app;



