
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
    this.sortOrder = 'asc';
    this.businesses = [];
  }

  async main() {

    document.getElementById('restaurantsearch').addEventListener('input', this.search.bind(this));
    document.getElementById('sortOrderAction').addEventListener('click', this.toggleSortOrder.bind(this));

    let qs = await this.db.collection('businesses').orderBy('name', this.sortOrder).get();

    this.businesses = qs.docs.map(q => q.data());
    this.buildList(this.businesses, this.sortOrder);
    this.updateCount(this.businesses.length);

  }

  buildList(businesses, sortOrder) {

    let listelt = document.getElementById('businesses');

    if (this.businesses.length === 0) {
      listelt.innerHTML = '<div class="alert alert--info">No businesses yet. <a href="addbusiness.html">Add a new business?</a></div>';
      return;
    }

    listelt.innerHTML = this.businesses.map(b => `
      <li class="card">
        <biz-card
          place_id="${b.place_id}"
          name="${b.name}"
          address="${b.address}"
          photo="${b.photo}"
          icon="${b.icon}"
          gclink="${b.gclink}"
          ubereatslink="${b.ubereatslink}"
          doordashlink="${b.doordashlink}"
          three52deliverylink="${b.three52deliverylink}"
          bitesquadlink="${b.bitesquadlink}"
          cflink="${b.cflink}"
          blurb="${b.blurb}"
          website="${b.website}"
          url="${b.url}">
        </biz-card>
      </li>`).join('');
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

    let visibleCards = Array.from(document.querySelectorAll('#businesses > li'))
                            .filter(bc => !bc.classList.contains('hidden'));
    this.updateCount(visibleCards.length);

  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.businesses = this.businesses.reverse();
    this.buildList(this.businesses, this.sortOrder);
  }

  updateCount(count) {
    document.getElementById('count').innerText = count;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var gll = new GLL();
  gll.main();
});
