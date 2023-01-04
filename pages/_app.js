import '../styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db} from '../firebase'
import Login  from './login'
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { collection, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"; 

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(()=>{

    if(user) {
     const usersRef = collection(db, "users");

      setDoc(doc(usersRef, user.uid), {
        // displayName: user.username,
      email:user.email,
        lastSeen:serverTimestamp(),
        photoURL: user.photoURL
     }, {merge: true})
    
    
      // db.collection('users').doc(user.uid).set({
      //   email:user.email,
      //   lastSeen: getFirestore().fieldValue.serverTimeStamp(),
      //   photoURL: user.photoURL
      // }, {merge: true} )
    }

  }, [user])

  if(loading) return <Loading/>

  if (!user) return <Login/>
  return <Component {...pageProps} />
}

export default MyApp
