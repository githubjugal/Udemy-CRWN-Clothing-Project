import {initializeApp} from 'firebase/app';

import 
{getAuth,
signInWithRedirect,
signInWithPopup, 
GoogleAuthProvider,
} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyAv28jVyFuhVSbY-t3kNzKmROLT1Pzjy5A",
  
    authDomain: "crwn-clothing-db-jugal777.firebaseapp.com",
  
    projectId: "crwn-clothing-db-jugal777",
  
    storageBucket: "crwn-clothing-db-jugal777.appspot.com",
  
    messagingSenderId: "9105891431",
  
    appId: "1:9105891431:web:43505d366657befae234c2"
  
  };

  
  
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider =new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth)=> {
    const userDocRef = doc(db, 'user', userAuth.uid);

    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };