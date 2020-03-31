import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {getdb, firebaseConfig} from './globals';
import './counting-text.js';

var placeData;

function postMessage(content) {
  document.getElementById('message').innerHTML = content;
}

async function choose(e) {
  // clear old messages
  postMessage('');

  // warn them if this placeId already exists in our db
  placeData = this.getPlace();
  let db = getdb();
  let qs = await db.collection('businesses').where('place_id', '==', placeData.place_id).get();

  if (qs.size > 0) {
    postMessage('<div class="alert alert--error">Warning: this business already listed!</div>');
  }

}

async function addBusiness() {

  let data = {
    name: placeData.name,
    address: placeData.formatted_address,
    place_id: placeData.place_id,
    icon: placeData.icon,
    website: placeData.website || '',
    url: placeData.url || '',
    photo: placeData.photos[0].getUrl({maxWidth:600}),
    gclink: getLink('gclink'),
    ubereatslink: getLink('ubereatslink'),
    doordashlink: getLink('doordashlink'),
    bitesquadlink: getLink('bitesquadlink'),
    three52deliverylink: getLink('three52deliverylink'),
    cflink: getLink('cflink'),
    blurb: (document.getElementById('blurb').value || '')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
  };

  let db = getdb();
  await db.collection('businesses').add(data);

  postMessage('<div class="alert alert--success alert--fixed">Business successfully added.<a href="index.html"> &#x2190; Go back</a></div>');

  clear();

}

function clear() {
  document.querySelectorAll('input').forEach(i => i.value = '');
  document.querySelectorAll('counting-text').forEach(ct => ct.value = '');
  document.getElementById('search').focus();
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

  let searchBox = document.getElementById('search');
  let autocomplete = new google.maps.places.Autocomplete(searchBox, {
    types: ['establishment'],
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng(29.476256, -82.656630), // SW corner of Alachua County
      new google.maps.LatLng(29.935487, -82.061308)  // NE corner
    ),
    fields: ['place_id', 'formatted_address', 'icon', 'name', 'photo', 'url', 'website'],
    strictBounds: true
  });
  autocomplete.addListener('place_changed', choose);

  searchBox.focus();

});