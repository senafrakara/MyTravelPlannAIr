import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Constants from 'expo-constants'

// Initialize Firebase
const fbConfig = {
    apiKey: Constants?.expoConfig?.extra?.FIREBASE_CONFIG_API_KEY,
    authDomain: Constants?.expoConfig?.extra?.FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: "travelplannair",
    storageBucket: "travelplannair.appspot.com",
    messagingSenderId: Constants?.expoConfig?.extra?.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: Constants?.expoConfig?.extra?.FIREBASE_CONFIG_APP_ID,
    measurementId: Constants?.expoConfig?.extra?.FIREBASE_CONFIG_MEASUREMENT_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(fbConfig);
}

const app = firebase.initializeApp(fbConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const nowDate = new Date(firebase.firestore.Timestamp.now().toDate().setHours(0, 0, 0, 0));
/* const updateEmail = auth.currentUser.updateEmail();
const updatePassword = auth.currentUser.updatePassword();
const updateProfile = auth.currentUser.updateProfile();
const EmailAuthProvider = firebase.auth.EmailAuthProvider;
const reauthenticateWithCredential = auth.currentUser.reauthenticateWithCredential(); */

export { app, db, auth, nowDate };