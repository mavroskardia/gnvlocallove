import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {getdb, firebaseConfig} from './globals';

async function addBusiness() {
    let db = getdb();
    let name = document.getElementById('name').value;
    let link = document.getElementById('link').value;
    // TODO: vet/sanitize links
    await db.collection('businesses').add({
        "name": name,
        "url": link
    });

    document.getElementById('message').innerHTML = `successfully added business`;
}

document.addEventListener('DOMContentLoaded', () => {
    firebase.initializeApp(firebaseConfig);
    document.getElementById('add_business_btn').addEventListener('click', addBusiness);
});