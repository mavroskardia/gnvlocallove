import {LitElement, html} from 'lit-element';

class BizCard extends LitElement {
  render() {
    return html`
      <div>
        <img src="${this.photo}" width="100">
        <span>${this.name}</span>
      </div>
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      address: { type: String },
      gclink: { type: String },
      photo: { type: String },
      icon: { type: String }
    }
  }
}

customElements.define('biz-card', BizCard);