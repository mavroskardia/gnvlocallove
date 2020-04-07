import {LitElement, html, css} from 'lit-element';
import { getdb, getLink } from './globals';
import './counting-text';

export class BizCardEditor extends LitElement {

  static get properties() {
    return {
      bizCard: { type: Object }
    }
  }

  firstUpdated() {
    this.db = getdb();
    this.doc = this.db.collection('businesses').doc(this.bizCard.id);
  }

  render() {
    return html`
      <fieldset class="col--full">
        <label for="gclink">Link to gift cards</label>
        <input id="gclink" type="url" placeholder="Link to gift cards (if you know it)" value="${this.bizCard.gclink || ''}">
        <small>
          Gift card setup:
          <a href="https://squareup.com/help/us/en/article/6000-square-egift-cards" target="_blank">Square</a>,
          <a href="https://www.clover.com/help/valuelink-app-manage-gift-cards/" target="_blank">Clover</a>,
          <a href="https://central.toasttab.com/s/article/How-do-I-sell-my-customer-a-gift-card-using-Toast-1493052763434#SellingECard" target="_blank">Toast</a>
        </small>
      </fieldset>
      <fieldset class="col--left">
        <label for="three52deliverylink">352 Delivery</label>
        <input type="url" id="three52deliverylink" placeholder="352 Delivery link" value="${this.bizCard.three52deliverylink || ''}">
        <small>Find your restaurant on <a href="https://www.352delivery.com/" target="_blank">352 Delivery</a> and paste the link above.</small>
      </fieldset>
      <fieldset class="col--right">
        <label for="ubereatslink">UberEats</label>
        <input type="url" id="ubereatslink" placeholder="Uber Eats link" value="${this.bizCard.ubereatslink || ''}">
        <small>Find your restaurant on <a href="https://www.ubereats.com/category/gainesville" target="_blank">UberEats</a> and paste the link above.</small>
      </fieldset>
      <fieldset class="col--left">
        <label for="doordashlink">DoorDash</label>
        <input type="url" id="doordashlink" placeholder="DoorDash link" value="${this.bizCard.doordashlink || ''}">
        <small>Find your restaurant on <a href="https://www.doordash.com/food-delivery/gainesville-fl-restaurants/" target="_blank">DoorDash</a> and paste the link above.</small>
      </fieldset>
      <fieldset class="col--right">
        <label for="bitesquadlink">BiteSquad</label>
        <input type="url" id="bitesquadlink" placeholder="Bite Squad link" value="${this.bizCard.bitesquadlink || ''}">
        <small>Find your restaurant on <a href="https://tinyurl.com/yx56ua73" target="_blank">BiteSquad</a> and paste the link above.</small>
      </fieldset>
      <fieldset class="col--full">
        <label for="three52deliverylink">Add a link to donation/crowdfunding campaign</label>
        <input type="url" id="cflink" placeholder="Link to donation/crowdfunding campaign" value="${this.bizCard.cflink || ''}">
      </fieldset>
      <fieldset>
        <label for="bizphoto">URL to preferred photo for your business</label>
        <input type="url" id="bizphoto" placeholder="https://example.com/image.jpg" value="${this.bizCard.photo || ''}">
      </fieldset>
      <fieldset class="col--full">
        <label for="blurb">Anything additional you want people to know about your business?</label>
        <counting-text id="blurb" maxlength="600" value="${this.bizCard.blurb || ''}"></counting-text>
      </fieldset>
      <button @click="${this.cancel}">Cancel</button>
      <button @click="${this.submit}">Submit Revisions</button>
    `;
  }

  cancel() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  submit() {
    // TODO: grab the doc ref and update the changed fields
    let photoUrl = this.shadowRoot.getElementById('bizphoto').value || this.bizData.photo;

    this.doc.update({
      gclink: getLink('gclink', this.shadowRoot),
      cflink: getLink('cflink', this.shadowRoot),
      three52deliverylink: getLink('three52deliverylink', this.shadowRoot),
      doordashlink: getLink('doordashlink', this.shadowRoot),
      ubereatslink: getLink('ubereatslink', this.shadowRoot),
      bitesquadlink: getLink('bitesquadlink', this.shadowRoot),
      photo: photoUrl,
      blurb: getLink('blurb', this.shadowRoot)
    }).then(() => {
      console.log('successfully updated business');
      window.location.reload();
    });

    this.dispatchEvent(new CustomEvent('close'));
  }
}

customElements.define('biz-card-editor', BizCardEditor);