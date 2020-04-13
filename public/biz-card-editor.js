import {LitElement, html, css} from 'lit-element';
import { getdb, getLink } from './globals';
import './counting-text';

export class BizCardEditor extends LitElement {

  static get properties() {
    return {
      bizCard: { type: Object }
    }
  }

  static get styles() {
    return css`
      h2 { color: var(--midnight); }
      .grid {
        margin: 0 0 calc(var(--base-unit)*2) 0;
        padding: 0 calc(var(--base-unit)*2);
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-column-gap: var(--base-unit);
      }

      .col--left,
      .col--left  {
        grid-column: 1 / 5;
        grid-row: auto;
      }

      .col--right,
      .col--right {
        grid-column: 5 / 9;
        grid-row: auto;
      }

      .col--full ,
      .col--full {
        grid-column: 1 / -1;
        grid-row: auto;
      }

      .btn {
        font-size: 1.8rem;
        margin-top: var(--base-unit);
        width: 100%;
        outline: none;
        cursor: pointer;
        color: var(--emerald);
        padding: var(--base-unit);
        background: transparent;
        border: 1px solid var(--emerald);
        border-radius: calc(var(--base-unit)*2);
      }

      .btn:hover {
        color: #fff;
        background: var(--emerald);
      }

      .btn--secondary {
        color: var(--midnight);
        background: transparent;
        border: 1px solid var(--midnight);
      }

      .btn--secondary:hover {
        color: #fff;
        background: var(--midnight);
      }

      fieldset {
        padding: var(--base-unit) 0 0 0;
        margin: 0;
        border: 0;
      }

      fieldset label {
        display: block;
        font-size: 1.8rem;
        margin-bottom: calc(var(--base-unit)/2);
      }

      fieldset i {
        font-style: normal;
        font-weight: 1.8rem;
        color: var(--chili);
        display: inline-block;
        margin-right: calc(var(--base-unit)/4);
      }

      input[type="text"],
      input[type="url"],
      textarea {
        font-size: 1.8rem;
        width: 100%;
        background: var(--specter-100);
        border: 1px solid var(--specter-300);
        padding: var(--base-unit);
        border-radius: calc(var(--base-unit)*2);
        outline: none;
        box-sizing: border-box;
      }

      input[type="text"]:hover,
      input[type="text"]:focus,
      input[type="url"]:hover,
      input[type="url"]:focus,
      textarea:hover,
      textarea:focus {
        border: 1px solid var(--emerald);
      }
    `;
  }

  firstUpdated() {
    this.db = getdb();
    this.doc = this.db.collection('businesses').doc(this.bizCard.id);
  }

  render() {
    return html`
      <div class="grid">
        <h2 class="col--full">Suggest additional information or changes</h2>
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
        <fieldset class="col--full">
          <label for="bizphoto">URL to preferred photo for your business</label>
          <input type="url" id="bizphoto" placeholder="https://example.com/image.jpg" value="${this.bizCard.photo || ''}">
        </fieldset>
        <fieldset class="col--full">
          <label for="blurb">Anything additional you want people to know about your business?</label>
          <counting-text id="blurb" maxlength="600" placeholder="Anything up to 600 characters" value="${this.bizCard.blurb || ''}"></counting-text>
        </fieldset>
        <fieldset class="col--full">
          <button @click="${this.submit}" class="btn">Submit Revisions</button>
          <button @click="${this.cancel}" class="btn btn--secondary">Cancel</button>
        </fieldset>
      </div>
    `;
  }

  cancel() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  submit() {
    let suggestedData = Object.assign({}, this.bizCard.databag);
    suggestedData.photo = this.shadowRoot.getElementById('bizphoto').value;
    let gclink = getLink('gclink', this.shadowRoot);
    let cflink = getLink('cflink', this.shadowRoot);
    let three52deliverylink = getLink('three52deliverylink', this.shadowRoot);
    let doordashlink = getLink('doordashlink', this.shadowRoot);
    let ubereatslink = getLink('ubereatslink', this.shadowRoot);
    let bitesquadlink = getLink('bitesquadlink', this.shadowRoot);
    let blurb = this.shadowRoot.getElementById('blurb').value;

    if (gclink) suggestedData.gclink = gclink;
    if (cflink) suggestedData.cflink = cflink;
    if (three52deliverylink) suggestedData.three52deliverylink = three52deliverylink;
    if (doordashlink) suggestedData.doordashlink = doordashlink;
    if (ubereatslink) suggestedData.ubereatslink = ubereatslink;
    if (bitesquadlink) suggestedData.bitesquadlink = bitesquadlink;
    if (blurb) suggestedData.blurb = blurb;

    this.db.collection('suggestions').add(suggestedData).then(() => {

      this.dispatchEvent(new CustomEvent('toast', {
        bubbles: true,
        composed: true,
        detail: {
          message: 'Suggestions noted! If they are accepted, they will take effect within 24 hours.'
        }
      }));

      this.dispatchEvent(new CustomEvent('close'));
    });

  }
}

customElements.define('biz-card-editor', BizCardEditor);