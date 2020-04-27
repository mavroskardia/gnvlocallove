import {LitElement, html, css} from 'lit-element';
import './biz-card';

class CoachingModal extends LitElement {

  static get styles() {
    return css`

      .coaching-modal {
        background-color: var(--emerald);
        height: 50vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      .tooltip {
        background-color: #fff;
        padding: 4px;
        border: solid 1px var(--blue);
      }

      .close-button {
        position: absolute;
        top: -1em;
        right: 0;
      }
    `;
  }

  render() {
    return html`
      <div class="coaching-modal">

        <button class="close-button" @click="${this.close}">&times;</button>

        <div class="left">
          <span class="tooltip">Change this listing</span>
          <div class="fake-card">
            <div class="fake-edit-button"></div>
          </div>
        </div>

        <div class="right">
          <p>Some text about this feature</p>
        </div>

      </div>
    `;
  }

  close() {
    this.dispatchEvent(new CustomEvent('close'));
  }

}

customElements.define('coaching-modal', CoachingModal);