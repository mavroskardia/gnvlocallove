import {LitElement, html, css} from 'lit-element';

class CountingText extends LitElement {

  constructor() {
    super();
    this.used = 0;
  }

  static get properties() {
    return {
      value: {type: String, reflect: true},
      maxlength: {type: Number},
      placeholder: {type: String},
      used: {type: Number}
    }
  }

  attributeChangedCallback(name, oldval, newval) {
    if (name === 'value') {
      this.shadowRoot.getElementById('thetext').value = newval;
    }
    super.attributeChangedCallback(name, oldval, newval);
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      fieldset { 
        position: relative; 
        margin: 0;
        border: 0;
      }

      small {
        position: absolute;
        left: 0; 
        right: 0; 
        margin-left: auto; 
        margin-right: auto;
        bottom: 0;
        display: inline-block;
        padding: calc(var(--base-unit)/2);
        background: #fff;
        border: 1px solid var(--specter-100);
        box-shadow: var(--shadow);
        border-radius: 32px;
        max-width: 64px;
        text-align: center;
      }

      textarea {
        width: calc(100% - var(--base-unit)*2);
        background: var(--specter-100);
      	border: 1px solid var(--specter-300);
	      padding: var(--base-unit) var(--base-unit) calc(var(--base-unit)*2) var(--base-unit);
	      border-radius: calc(var(--base-unit)*2);
        font-size: var(--base-unit);
        font-family: var(--sans-font-family);
      }
    `;
  }

  render() {
    return html`
      <fieldset>
        <small>${this.used} / ${this.maxlength}</small>
        <textarea id="thetext"
          maxlength="${this.maxlength}"
          placeholder="${this.placeholder}"
          @input="${this.updateCount}"></textarea>
      </fieldset>
    `;
  }

  updateCount(e) {
    let elt = this.shadowRoot.getElementById('thetext');
    this.used = elt.value.length;
    this.value = elt.value;
  }

}

customElements.define('counting-text', CountingText);
