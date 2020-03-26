import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {getdb, firebaseConfig} from './globals';

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
          <span>${c.description}</span>
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
  let predata = JSON.parse(decodeURI(elt.dataset.bag));
  let data = await build_data(predata);

  await db.collection('businesses').add(data);

  postMessage('added business successfully');

}

async function build_data(places_data) {
  return new Promise(resolve => {
    let gnv = new google.maps.LatLng(29.6515, -82.3248);
    let map = new google.maps.Map(document.getElementById('map'), {
      center: gnv, zoom: 15
    });
    let service = new google.maps.places.PlacesService(map);

    service.getDetails({
      placeId: places_data.place_id,
      fields: ['formatted_address', 'icon', 'name', 'photo']
    }, async (result, status) => {
      let photoData = result.photos[0].getUrl({
        maxWidth: 100, maxHeight: 100
      });
      // TODO: vet/sanitize links
      let data = {
        name: result.name,
        address: result.formatted_address,
        place_id: places_data.place_id,
        icon: result.icon,
        photo: photoData,
        gclink: document.getElementById('gclink').value
      };
      resolve(data);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  firebase.initializeApp(firebaseConfig);
  document.getElementById('add_business_btn').addEventListener('click', addBusiness);
  document.getElementById('search').addEventListener('input', lookup);
});