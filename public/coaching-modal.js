import {LitElement, html, css} from 'lit-element';
import './biz-card';

class CoachingModal extends LitElement {

  static get styles() {
    return css`
      .coaching-modal {
        position: fixed;
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.95);
      }

      .coaching-modal div.content {
        position: relative;
        display: flex;
        width: 80vw;
        max-width: 900px;
        background: #FFFFFF;
        border: 1px solid #EDF2F6;
        box-shadow: 0 2px 32px 0 rgba(0,0,0,0.10);
        border-radius: 24px;
      }

      .coaching-modal div.content .left-col,
      .coaching-modal div.content .right-col {
        width: 50%;
        box-sizing: border-box;
      }

      .coaching-modal div.content .left-col {
        position: relative;
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
        background: var(--emerald) url("data:image/svg+xml,%3Csvg width='368' height='312' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M24 46h282c13.255 0 24 10.745 24 24v218c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V70c0-13.255 10.745-24 24-24z' fill='%23FFF'/%3E%3Crect fill='%232ECC71' x='15' y='257' width='300' height='40' rx='20'/%3E%3Cpath d='M79 210h173a4 4 0 110 8H79a4 4 0 110-8z' fill='%23E6EDF2'/%3E%3Cpath d='M129 222h75a4 4 0 110 8h-75a4 4 0 110-8zM24 46h282c13.255 0 24 10.745 24 24v114H0V70c0-13.255 10.745-24 24-24z' fill='%23F4F7F9'/%3E%3Cpath d='M204.168 76.875c.538 0 .975.436.975.975v18.681a6.386 6.386 0 01-1.959 4.602V153.9a.975.975 0 01-.975.975h-71.887a.975.975 0 01-.975-.975v-52.544a6.39 6.39 0 01-2.204-4.825V77.85c0-.539.436-.975.975-.975zm-27.579 71.086h-21.13v4.964h21.13v-4.964zm-23.08-16.941h-22.212v21.905h22.212V131.02zm47.726 0h-22.696v21.905h22.696V131.02zm-29.66-31.107a6.402 6.402 0 01-5.432 3.026 6.402 6.402 0 01-5.432-3.026 6.4 6.4 0 01-5.252 3.017v43.081h21.13v-43.093a6.402 6.402 0 01-5.014-3.005zm1.611 28.962c.529 0 .957.428.957.956v12.088a.956.956 0 01-.957.956H161.1a.956.956 0 01-.956-.956V129.83c0-.528.428-.956.956-.956zm-.956 1.913h-10.174v10.174h10.174v-10.174zm-22.384-30.875a6.402 6.402 0 01-5.432 3.026 6.402 6.402 0 01-5.432-3.026 6.402 6.402 0 01-5.432 3.026 6.36 6.36 0 01-2.253-.417v26.548h22.212v-26.385a6.425 6.425 0 01-3.663-2.772zm43.458 0a6.402 6.402 0 01-5.433 3.026 6.402 6.402 0 01-5.432-3.026 6.42 6.42 0 01-3.9 2.833v26.324h22.696V102.43a6.37 6.37 0 01-2.5.508 6.402 6.402 0 01-5.431-3.026zm-26.161 5.962c3.86 0 7 3.417 7 7.616v9.343c0 .576-.428 1.041-.957 1.041H161.1c-.528 0-.956-.465-.956-1.04v-9.344c0-4.2 3.14-7.616 7-7.616zm0 2.081c-2.805 0-5.087 2.483-5.087 5.535v8.303h10.174v-8.303c0-3.052-2.282-5.535-5.087-5.535zm25.186-21.866h-8.915V96.53c0 2.459 2 4.458 4.457 4.458 2.458 0 4.458-2 4.458-4.458V86.09zm-43.458 0h-8.914V96.53c0 2.459 2 4.458 4.457 4.458 2.458 0 4.457-2 4.457-4.458V86.09zm21.73 0h-8.915V96.53c0 2.459 1.999 4.458 4.457 4.458 2.458 0 4.457-2 4.457-4.458V86.09zm-10.865 0h-8.915V96.53c0 2.459 2 4.458 4.458 4.458 2.457 0 4.457-2 4.457-4.458V86.09zm21.728 0h-8.914V96.53c0 2.459 2 4.458 4.457 4.458 2.458 0 4.457-2 4.457-4.458V86.09zm-43.457 0h-8.914V96.53c0 2.459 2 4.458 4.457 4.458 2.458 0 4.457-2 4.457-4.458V86.09zm65.186 0h-8.914V96.53c0 2.459 1.999 4.458 4.457 4.458 2.458 0 4.457-2 4.457-4.458V86.09zm0-7.265h-8.914v5.315h8.914v-5.315zm-10.864 0h-8.915v5.315h8.915v-5.315zm-21.729 0h-8.914v5.315h8.914v-5.315zm10.864 0h-8.914v5.315h8.914v-5.315zm-21.728 0h-8.915v5.315h8.915v-5.315zm-10.865 0h-8.914v5.315h8.914v-5.315zm-10.864 0h-8.914v5.315h8.914v-5.315z' fill='%23DBE5EC' fill-rule='nonzero'/%3E%3Cpath fill='%23E6EDF2' d='M0 183h332v1H0z'/%3E%3Cpath d='M305 55a16 16 0 0116 16c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16zm3.328 8a.89.89 0 00-.616.26L297.26 73.713a.889.889 0 00-.26.628v3.771c0 .491.398.889.889.889h3.77a.889.889 0 00.63-.26l10.45-10.452a.889.889 0 000-1.257l-3.77-3.77a.89.89 0 00-.64-.26zm.013 2.146l2.514 2.514-9.563 9.562h-2.514v-2.514l9.563-9.562z' fill='%232ECC71' fill-rule='nonzero'/%3E%3Cpath d='M244 0h120a4 4 0 014 4v35a4 4 0 01-4 4h-45.16l-9.224 8.546a4 4 0 01-5.323.103L294.207 43H244a4 4 0 01-4-4V4a4 4 0 014-4z' fill='%23FFF'/%3E%3Ctext font-family='Helvetica' font-size='14' fill='%230074E8' transform='translate(240)'%3E%3Ctspan x='19.259' y='26'%3EEdit this listing%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E");
        background-size: fit;
        background-repeat: no-repeat;
        background-position: center;
        min-height: 400px;
      }


      @media ( max-width: 950px ) {

        .coaching-modal div.content .left-col {
          display: none;
        }

        .coaching-modal div.content .right-col {
          width: 100%;
        }

      }

      .coaching-modal div.content .right-col {
        padding: calc(var(--base-unit)*2);
      }

      .coaching-modal div.content h3 {
        margin: 0;
        font-weight: normal;
      }

      .coaching-modal div.content p {
        font-size: 16px;
        margin-bottom: var(--base-unit);
      }

      .coaching-modal div.content ul {
        padding-left: 16px;
        margin: var(--base-unit) 0;
        list-style-type: square;
      }

      .coaching-modal div.content ul li {
        font-size: 16px;
        margin: var(--base-unit) 0;
      }

      .coaching-modal .close-button {
        position: absolute;
        top: -16px;
        right:-16px;
        height: 32px;
        width: 32px;
        border: 0;
        color: #fff;
        background: #e74c3c;
        border-radius: 48px;
        font-size: 20px;
        cursor: pointer;
      }

      .btn {
        font-size: 1.6rem;
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

    `;
  }

  render() {
    return html`
      <div class="coaching-modal">
        <div class="content">
          <button class="close-button" @click="${this.close}">&times;</button>
          <div class="left-col">
          </div>
          <div class="right-col">
            <h3>Release Notes:</h3>
            <p>
              We're working to squash bugs and release new features.
              Below is an account of the improvements you’ll find in the latest releases.
            </p>
            <ul>
              <li>
                <b>New feature:</b> Added the ability to suggest edits to listings.
              </li>
              <li>
                <b>New feature:</b> Added release notes.
              </li>
              <li>
                <b>Improved performance:</b> Fixed BG scroll animation.
              </li>
            </ul>
            <p>
              Please
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSd1q8Qt1EhaVYYRFfTQwcYlKBdtdlIuQQHJfKKyMYg9EcFlxg/viewform" target="_blank">
                let us know
              </a>
              if you have any suggestions on how we can better help our community's
              local businesses.
            </p>

            <button class="btn" @click="${this.close}">Got it</button>

          </div>
        </div>
      </div>
    `;
  }

  close() {
    this.dispatchEvent(new CustomEvent('close'));
  }

}

customElements.define('coaching-modal', CoachingModal);