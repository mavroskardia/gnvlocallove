import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {getdb, firebaseConfig, placesConfig} from './globals';

async function lookup(e) {
  let text = e.target.value;
  // wait until they've typed enough to be useful
  if (text.length < 3) return;

  let elt = document.getElementById('map');
  let gnv = new google.maps.LatLng(29.6515, -82.3248);
  let map = new google.maps.Map(elt, {center:gnv, zoom:15});
  let service = new google.maps.places.PlacesService(map);
  let request = {
    query: text,
    fields: ['formatted_address','icon','name','photos','place_id']
  };

  service.findPlaceFromQuery(request, (result, status) => {

    let elt = document.getElementById('results');
    elt.innerHTML = result.map(c => `
      <li data-bag="${encodeURI(JSON.stringify(c))}">
          <img src="${c.icon}">
          <strong>${c.name}</strong>
          <small>${c.formatted_address}</small>
      </li>`).join();

    document.querySelectorAll('#results li').forEach(li => {
      li.addEventListener('click', choose);
    });

  });

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