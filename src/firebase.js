// Conexión con Firebase.
// Los valores se leen del archivo .env mediante import.meta.env (nunca se escriben acá).
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Si falta alguna variable, la app avisa en pantalla en lugar de romperse.
export const configCompleta = Object.values(firebaseConfig).every(Boolean);

let auth = null;
let db = null;

if (configCompleta) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app); // Authentication: identifica a cada visitante (anónimo)
  db = getFirestore(app); // Cloud Firestore: base de datos
}

export { auth, db };
