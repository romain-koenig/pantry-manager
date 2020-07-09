import Rebase from 're-base'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pantry-manager-rko.firebaseapp.com",
  databaseURL: "https://pantry-manager-rko.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//named Export
export { firebaseApp };

//default export
export default base;