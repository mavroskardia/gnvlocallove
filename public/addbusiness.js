import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {getdb, firebaseConfig, placesConfig} from './globals';

async function lookup(e) {
  let text = e.target.value;
  // wait until they've typed enough to be useful
  if (text.length < 3) return;

  let paramsList = [
    `key=${placesConfig.apiKey}`,
    `input=${text}`,
    'inputtype=textquery',
    'fields=formatted_address,icon,name,photos,place_id'
  ];
  let params = paramsList.join('&');
  let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${params}`;

  let response = await fetch(url);
  let data = await response.json();

  let elt = document.getElementById('results');
  elt.innerHTML = data.candidates.map(c => `
    <li data-bag="${encodeURI(JSON.stringify(c))}">
        <img src="${c.icon}">
        <strong>${c.name}</strong>
        <small>${c.formatted_address}</small>
    </li>`).join();

  document.querySelectorAll('#results li').forEach(li => {
    li.addEventListener('click', choose);
  })
}

function postMessage(text) {
  document.getElementById('message').innerHTML = text;
}

function choose(e) {
  let elt = e.target;
  while (elt.nodeName !== 'LI') elt = elt.parentElement;
  elt.classList.add('chosen');
}

async function addBusiness() {
  let db = getdb();

  let elt = document.querySelector('#results .chosen');
  let data = JSON.parse(decodeURI(elt.dataset.bag));
  data['gclink'] = document.getElementById('gclink').value;

  // TODO: vet/sanitize links
  await db.collection('businesses').add(data);

  postMessage('added business successfully');

}

document.addEventListener('DOMContentLoaded', () => {
    firebase.initializeApp(firebaseConfig);
    document.getElementById('add_business_btn').addEventListener('click', addBusiness);
    document.getElementById('search').addEventListener('input', lookup);
});