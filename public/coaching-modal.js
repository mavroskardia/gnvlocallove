import {LitElement, html, css} from 'lit-element';
import './biz-card';

class CoachingModal extends LitElement {

  static get styles() {
    return css`

      .coaching-modal {
        background-color: rgba(0,0,0,0.5);
        height: 100%;
      }

      biz-card {
        width: 320px;
        height: 600px;
      }

    `;
  }

  render() {
    return html`
      <div class="coaching-modal">

        <div class="left">
          <span class="tooltip">Change this listing</span>
          <biz-card></biz-card>
        </div>

        <div class="right">
          <p>Some text about this feature</p>
        </div>

      </div>
    `;
  }

}

customElements.define('coaching-modal', CoachingModal);