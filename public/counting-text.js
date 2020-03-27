import {LitElement, html, css} from 'lit-element';

class CountingText extends LitElement {

  constructor() {
    super();
    this.used = 0;
  }

  static get properties() {
    return {
      value: {type: String},
      maxlength: {type: Number},
      placeholder: {type: String},
      used: {type: Number}
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      div { position: relative; }
      small {
        position: absolute;
        bottom: 12px;
        left: var(--base-unit);
        color: #ccc;
        font-style: oblique;
      }

      textarea {
        width: calc(100% - var(--base-unit)*2);
        background: var(--specter-100);
      	border: 1px solid var(--specter-300);
	      padding: var(--base-unit);
	      border-radius: calc(var(--base-unit)*2);
        font-size: 16px;
        font-family: "Roboto", sans-serif;
      }
    `;
  }

  render() {
    return html`
      <div>
        <textarea id="thetext"
          maxlength="${this.maxlength}"
          placeholder="${this.placeholder}"
          @input="${this.updateCount}"></textarea>
        <small>${this.used} / ${this.maxlength}</small>
      </div>
    `;
  }

  updateCount(e) {
    let elt = this.shadowRoot.getElementById('thetext');
    this.used = elt.value.length;
    this.value = elt.value;
  }

}

customElements.define('counting-text', CountingText);
