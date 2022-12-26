import firebase from "firebase/app";
import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyAwPk8KtGLmKB5ttBRahOJul6ygLIaRSCU",
    authDomain: "whatsapp-clone-65640.firebaseapp.com",
    projectId: "whatsapp-clone-65640",
    storageBucket: "whatsapp-clone-65640.appspot.com",
    messagingSenderId: "318108373573",
    appId: "1:318108373573:web:c3bf60a4df4f6e683dc92c"
  };

  const app = initializeApp(firebaseConfig) ;
  const storage = getStorage(app);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  export {db,auth, provider};
//   export default db;