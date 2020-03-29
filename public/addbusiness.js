import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {getdb, firebaseConfig} from './globals';
import './counting-text.js';

async function lookup(e) {

  let text = e.target.value;
  // wait until they've typed enough to be useful
  if (text.length < 3) return;

  let service = new google.maps.places.AutocompleteService();
  let request = {
    input: text,
    location: new google.maps.LatLng(29.6515, -82.3248),
    radius: 10,
  };

  service.getPlacePredictions(request, (result, status) => {
    let elt = document.getElementById('results');
    elt.innerHTML = result.filter(c=>c.types.indexOf('food') != -1)
    .map(c => `
      <li data-bag="${encodeURI(JSON.stringify(c))}">
        ${c.description}
      </li>`).join('');

    document.querySelectorAll('#results li').forEach(li => {
      li.addEventListener('click', choose);
    });

  });

}

function postMessage(text) {
  document.getElementById('message').innerHTML = text;
}

async function choose(e) {

  let search = document.getElementById('search');
  let elt = e.target;

  while (elt.nodeName !== 'LI') elt = elt.parentElement;

  document.querySelectorAll('#results > li').forEach(li => li.classList.remove('chosen'));

  elt.classList.add('chosen');

  //Update the search box to reflect the selected business
  search.value = elt.innerHTML.trim();

  // warn them if this placeId already exists in our db
  let predata = JSON.parse(decodeURI(elt.dataset.bag));
  let db = getdb();
  let qs = await db.collection('businesses').where('place_id', '==', predata.place_id).get();

  if (qs.size > 0) {
    postMessage('Warning: this business already listed!');
  }

}

async function addBusiness() {

  let db = getdb();
  let elt = document.querySelector('#results .chosen');
  let predata = JSON.parse(decodeURI(elt.dataset.bag));
  let data = await build_data(predata);

  await db.collection('businesses').add(data);

  postMessage('Business successfully added.');

  clear();

}

function clear() {
  document.querySelectorAll('input').forEach(i => i.value = '');
  document.querySelectorAll('counting-text').forEach(ct => ct.value = '');
  document.getElementById('search').focus();
}

async function build_data(places_data) {

  return new Promise(resolve => {

    let gnv = new google.maps.LatLng(29.6515, -82.3248);
    let mapParams = { center: gnv, zoom: 15 };
    let map = new google.maps.Map(document.getElementById('map'), mapParams);
    let service = new google.maps.places.PlacesService(map);
    let request = {
      placeId: places_data.place_id,
      fields: ['formatted_address', 'icon', 'name', 'photo']
    };

    service.getDetails(request, async (result, status) => {
      // TODO: vet/sanitize links?
      resolve({
        name: result.name,
        address: result.formatted_address,
        place_id: places_data.place_id,
        icon: result.icon,
        photo: result.photos[0].getUrl({maxWidth:600}),
        gclink: document.getElementById('gclink').value,
        ubereatslink: document.getElementById('ubereatslink').value,
        doordashlink: document.getElementById('doordashlink').value,
        bitesquadlink: document.getElementById('bitesquadlink').value,
        three52deliverylink: document.getElementById('three52deliverylink').value,
        cflink: document.getElementById('cflink').value,
        blurb: document.getElementById('blurb').value
      });

    });
  });
}

document.addEventListener('DOMContentLoaded', () => {

  firebase.initializeApp(firebaseConfig);
  document.getElementById('add_business_btn').addEventListener('click', addBusiness);
  document.getElementById('search').addEventListener('input', lookup);
  document.getElementById('search').focus();

});