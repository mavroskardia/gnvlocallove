import * as firebase from 'firebase';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDSQK-C2vtKMopX3qsBzHxfc5n4YMsnS2Y",
  authDomain: "gnv-local-love.firebaseapp.com",
  databaseURL: "https://gnv-local-love.firebaseio.com",
  projectId: "gnv-local-love",
  storageBucket: "gnv-local-love.appspot.com",
  messagingSenderId: "204298349507",
  appId: "1:204298349507:web:a3bde1a4b21479be89eb76",
  measurementId: "G-6C337Y0HWW"
};

export function getdb(override) {
  let db = firebase.firestore();
  if (!override && location.hostname === "localhost") {
    db.settings({
      host: "localhost:8080",
      ssl: false
    });
  }
  return db;
}
