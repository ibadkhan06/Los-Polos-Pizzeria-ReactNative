import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
// import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyArfp_tCENDuEUVrDi6Vvn8Hyn_ngfyvS4",
    authDomain: "mobproject-6e129.firebaseapp.com",
    projectId: "mobproject-6e129",
    storageBucket: "mobproject-6e129.appspot.com",
    messagingSenderId: "1024529639763",
    appId: "1:1024529639763:web:86b756d322b197690159a6"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const GOOGLE_PROVIDER = new GoogleAuthProvider();
