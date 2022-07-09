// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBNrHO51izZ_hypwVoQNf2T0JG18mtJf08",
    authDomain: "e-commrece-5557f.firebaseapp.com",
    projectId: "e-commrece-5557f",
    storageBucket: "e-commrece-5557f.appspot.com",
    messagingSenderId: "1015466921686",
    appId: "1:1015466921686:web:7dcdaddcbe86e66df10377"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth(); 