import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCwZpFfj1UP2eCJgT_vQySMAt_zv_Vb0xg",
    authDomain: "reactcommerce-efa36.firebaseapp.com",
    databaseURL: "https://reactcommerce-efa36.firebaseio.com",
    projectId: "reactcommerce-efa36",
    storageBucket: "reactcommerce-efa36.appspot.com",
    messagingSenderId: "693890448005",
    appId: "1:693890448005:web:be4d9ef4eed80b1f6387ec",
    measurementId: "G-2MCY8XB9B3"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; 

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const {displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set ({
          displayName, 
          email,
          createdAt,
          ... additionalData
        })
      } catch (error) {
        console.log('error creating user', error.messsage)
      }
    }

    return userRef;
  }



  firebase.initializeApp(config);


export const auth = firebase.auth();

export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
