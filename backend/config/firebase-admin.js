const admin = require('firebase-admin');

// Initialize Firebase Admin (only if credentials are provided)
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (projectId && privateKey && clientEmail) {
    const serviceAccount = {
      projectId: projectId,
      privateKey: privateKey,
      clientEmail: clientEmail
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${projectId}.appspot.com`
    });

    console.log('✅ Firebase Admin initialized');
  } else {
    console.log('⚠️  Firebase Admin not initialized - missing credentials in .env');
    console.log('   Required: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL');
  }
}

module.exports = admin;


