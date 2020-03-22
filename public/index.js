// firebase.auth().onAuthStateChanged(user => { });
// firebase.database().ref('/path/to/ref').on('value', snapshot => { });
// firebase.messaging().requestPermission().then(() => { });
// firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {firebaseConfig, getdb} from './globals';

async function main() {
    firebase.initializeApp(firebaseConfig);
    let db = getdb();
    let qs = await db.collection('businesses').get();
    let listelt = document.getElementById('businesses');

    listelt.innerHTML = '';

    qs.forEach(doc => {
        let bizdata = doc.data();
        listelt.innerHTML += `<li><a href="${bizdata.url}">${bizdata.name}</li>`;
    });

}

document.addEventListener('DOMContentLoaded', function() {
    main();
});