import {LitElement, html, css} from 'lit-element';

class BizCard extends LitElement {

  static get styles() {
    return css`
      :host {
        display: inline-block;
        background-color: #f7f7f7;
      }

      div {
        border: solid 1px #ccc;
        border-radius: 4px;
        box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
      }
    `;
  }

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