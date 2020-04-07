import * as firebase from 'firebase';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSy" + "DuzIlCFy7cCWP" + "P7NHvBiFvF6zAJyZ5l_Y",
  //apiKey: "AIzaSyDSQK-C2vtK" + "MopX3qsBzHxf" + "c5n4YMsnS2Y",
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

export function getLink(id, root) {
  if (!root) root = document;
  let linkText = root.getElementById(id).value;

  // they didn't specify anything, leave it alone
  if (linkText.length === 0) return '';

  if (linkText.indexOf('://') === -1) {
    // specified as a relative url, add the schema portion
    return `https://${linkText}`;
  }

  if (!linkText.startsWith('http')) {
    // gave url to something other than a website, no bueno
    return '[unsafe link]';
  }

  return linkText;
}
