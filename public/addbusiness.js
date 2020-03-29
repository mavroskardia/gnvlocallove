import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {getdb, firebaseConfig} from './globals';
import './counting-text.js';

async function lookup(e) {

  // clear any existing message
  postMessage('');

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

function postMessage(content) {
  document.getElementById('message').innerHTML = content;
}

async function choose(e) {

  let elt = e.target;
  while (elt.nodeName !== 'LI') elt = elt.parentElement;

  // warn them if this placeId already exists in our db
  let predata = JSON.parse(decodeURI(elt.dataset.bag));
  let db = getdb();
  let qs = await db.collection('businesses').where('place_id', '==', predata.place_id).get();

  if (qs.size > 0) {
    postMessage('<div class="alert alert--error">Warning: this business already listed!</div>');
  }

  // store the chosen field's data on the parent for later reference
  let parent = document.getElementById('results');
  parent.dataset.bag = elt.dataset.bag;
  // wipe the list
  parent.innerHTML = '';

  // Update the search box to reflect the selected business
  let search = document.getElementById('search');
  search.value = elt.innerHTML.trim();

}

async function addBusiness() {

  let db = getdb();
  let elt = document.querySelector('#results');
  let predata = JSON.parse(decodeURI(elt.dataset.bag));
  let data = await build_data(predata);

  await db.collection('businesses').add(data);

  postMessage('<div class="alert alert--success alert--fixed">Business successfully added.<a href="index.html"> &#x2190; Go back</a></div>');

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
      fields: ['formatted_address', 'icon', 'name', 'photo', 'website']
    };

    service.getDetails(request, async (result, status) => {
      resolve({
        name: result.name,
        address: result.formatted_address,
        place_id: places_data.place_id,
        icon: result.icon,
        photo: result.photos[0].getUrl({maxWidth:600}),
        gclink: getLink('gclink'),
        ubereatslink: getLink('ubereatslink'),
        doordashlink: getLink('doordashlink'),
        bitesquadlink: getLink('bitesquadlink'),
        three52deliverylink: getLink('three52deliverylink'),
        cflink: getLink('cflink'),
        blurb: document.getElementById('blurb').value || '',
        website: result.website
      });

    });
  });
}

function getLink(id) {
  let linkText = document.getElementById(id).value;

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

document.addEventListener('DOMContentLoaded', () => {

  firebase.initializeApp(firebaseConfig);
  document.getElementById('add_business_btn').addEventListener('click', addBusiness);
  document.getElementById('search').addEventListener('input', lookup);
  document.getElementById('search').focus();

});