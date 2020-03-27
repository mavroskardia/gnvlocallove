import {LitElement, html, css} from 'lit-element';

class BizCard extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
      }

      div.photo {
        width: 380px;
        height: 160px;
        background-repeat: no-repeat;
        background-size: cover;
      }

      h3 {
        font-weight: normal;
        padding: 16px;
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <div>
        <div class="photo" style="background-image: url(${this.photo});"></div>
        <h3>${this.name}</h3>
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