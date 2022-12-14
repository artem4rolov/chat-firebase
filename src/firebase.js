// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-yKnob4Xf2VIgqbnq395OvBLg3Ij_1Oc",
  authDomain: "chat-d02cd.firebaseapp.com",
  projectId: "chat-d02cd",
  storageBucket: "chat-d02cd.appspot.com",
  messagingSenderId: "471499798911",
  appId: "1:471499798911:web:546882d55099e6c324824a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// для авторизации используем auth
export const auth = getAuth();
// для загрузки фото используем storage
export const storage = getStorage();
// инициализация базы данных fireStore (чтобы юзеры могли общаться в чатах)
export const db = getFirestore();

// старые rules в firestore

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }

// новые rules в firestore (работают)

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }
