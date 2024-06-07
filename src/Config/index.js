import { initializeApp } from 'firebase/app';

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

//credenciais de teste, use o quanto precisar
const firebaseConfig = {
    apiKey: "AIzaSyAiWxZbV0IkJCkVzg9YqM_D9h8rMkX0hMA",
    authDomain: "global2tdss-e49ce.firebaseapp.com",
    projectId: "global2tdss-e49ce",
    storageBucket: "global2tdss-e49ce.appspot.com",
    messagingSenderId: "94848009312",
    appId: "1:94848009312:web:41eedd2e5e826f0a8daf05",
    measurementId: "G-5ZNG2MCHX7"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp as Firebase, db, auth };



