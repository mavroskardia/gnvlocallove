
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import {firebaseConfig, getdb} from './globals';
import './biz-card.js';

class GLL {

  constructor() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.db = getdb();
  }

  async main() {

    document.getElementById('restaurantsearch').addEventListener('input', this.search);
    // document.getElementById('sortOrder').addEventListener('click', search);

    let qs = await this.db.collection('businesses').orderBy('name').get();
    let listelt = document.getElementById('businesses');

    if (qs.size === 0) {
      listelt.innerHTML = '<div class="alert alert--info">No businesses yet. <a href="addbusiness.html">Add a new business?</a></div>';
      return;
    }

    listelt.innerHTML = '';

    qs.forEach(doc => {
      let bizdata = doc.data();

      listelt.innerHTML += `
      <li class="card">
        <biz-card
          place_id="${bizdata.place_id}"
          name="${bizdata.name}"
          address="${bizdata.address}"
          photo="${bizdata.photo}"
          icon="${bizdata.icon}"
          gclink="${bizdata.gclink}"
          ubereatslink="${bizdata.ubereatslink}"
          doordashlink="${bizdata.doordashlink}"
          three52deliverylink="${bizdata.three52deliverylink}"
          bitesquadlink="${bizdata.bitesquadlink}"
          cflink="${bizdata.cflink}"
          blurb="${bizdata.blurb}"
          website="${bizdata.website}"
          url="${bizdata.url}">
        </biz-card>
      </li>`;
    });

  }

  async search(e) {

    let text = e.target.value.toLowerCase();

    // reset any hidden
    document.querySelectorAll('#businesses > li').forEach(li => {
      li.classList.remove('hidden');
    });

    // hide those that don't match text
    Array.from(document.querySelectorAll('#businesses biz-card'))
      .filter(bc => bc.name.toLowerCase().indexOf(text) === -1)
      .forEach(bc => bc.parentElement.classList.add('hidden'));

  }
}

document.addEventListener('DOMContentLoaded', () => {
  var gll = new GLL();
  gll.main();
});
