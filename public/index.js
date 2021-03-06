
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import {firebaseConfig, getdb} from './globals';
import './biz-card.js';
import './biz-card-editor';
import './coaching-modal';

class GLL {

  constructor() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.db = getdb();
    this.sortOrder = 'asc';
    this.businesses = [];
  }

  clearFirstTimeCookie() {
    document.cookie = 'coachedOnSuggestions= ; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  isFirstTime() {
    let ift = !document.cookie.split(';').some(c => c.trim().startsWith('coachedOnSuggestions='));
    console.log(`is first time: ${ift}`);
    return ift;
  }

  async main() {

    document.getElementById('restaurantsearch').addEventListener('input', this.search.bind(this));
    document.getElementById('sortOrderAction').addEventListener('click', this.toggleSortOrder.bind(this));

    let qs = await this.db.collection('businesses').orderBy('name', this.sortOrder).get();

    this.businesses = qs.docs.map(q => ({id: q.id, ...q.data()}));
    this.buildList(this.businesses, this.sortOrder);
    this.updateCount(this.businesses.length);

    if (this.isFirstTime()) {
      let coachElt = document.createElement('coaching-modal');
      coachElt.addEventListener('close', () => {
        document.cookie = 'coachedOnSuggestions=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
        coachElt.remove();
      })
      document.body.appendChild(coachElt);
    }

  }

  buildList(businesses, sortOrder) {

    let listelt = document.getElementById('businesses');

    if (this.businesses.length === 0) {
      listelt.innerHTML = '<div class="alert alert--info">No businesses yet. <a href="addbusiness.html">Add a new business?</a></div>';
      return;
    }

    listelt.innerHTML = '';

    this.businesses.forEach(b => {
      let li = document.createElement('li');
      li.classList.add('card');
      let bc = document.createElement('biz-card');
      bc.databag = b;
      li.appendChild(bc);
      listelt.appendChild(li);
    });

    document.addEventListener('toast', this.showToast);

  }

  showToast(e) {
    let message = e.detail.message;
    let toastElt = document.getElementById('toast');
    toastElt.innerText = message;
    toastElt.classList.add('toasty');
    window.setTimeout(() => {
      toastElt.classList.remove('toasty');
    }, 4500); // amount of time to keep the toast up

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
    document.getElementById('sortOrderAction').innerHTML = this.sortOrder === 'asc'
      ? 'A &#x2192; Z' : 'Z &#x2192; A';
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
