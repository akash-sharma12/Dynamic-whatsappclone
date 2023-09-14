import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyDD6hb7uISbEDSUUqskYzA5my9PksdEZ7g",
  authDomain: "whats-app-clone-413cc.firebaseapp.com",
  projectId: "whats-app-clone-413cc",
  storageBucket: "whats-app-clone-413cc.appspot.com",
  messagingSenderId: "223836689857",
  appId: "1:223836689857:web:25fa42080eccfe2c02cb40",
  measurementId: "G-KX8RV37LGJ"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const messaging = getMessaging();


export { firebaseAuth as auth, provider, db };
export default firebaseApp;

