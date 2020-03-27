import {LitElement, html, css} from 'lit-element';

class BizCard extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
      }

      div.photo {
        width: 100%;
        height: 160px;
        background-repeat: no-repeat;
        background-size: cover;
      }

      div.content {
        padding: 16px;
        text-align: center;
      }

      div.content h2 {
        font-weight: normal;
        padding: 0;
        margin: 16px 0;
        text-align: center;
      }

      div.content .btn {
        display: inline-block;
        outline: none;
        cursor: pointer;
        color: #2ecc71;
        padding: 16px;
        margin-bottom: 16px;
        background: transparent;
        border: 1px solid #2ecc71;
        border-radius: 32px;
        text-decoration: none;
      }
      
      div.content .btn:hover {
        color: #fff;
        background: #2ecc71;
      }

      div.content p {
        padding: 0;
        margin: 0;
      }


    `;
  }

  render() {
    return html`
      <div>
        <div class="photo" style="background-image: url(${this.photo});"></div>
        <div class="content">
          <h2>${this.name}</h2>
          <a href="#" class="btn">Purchase gift cards</a>
          <p>Fames adipiscing faucibus dictumst condimentum ipsum mi curae. Bibendum lorem mi lectus nostra porta penatibus metus sollicitudin euismod. Aliquet convallis elit libero posuere dictum parturient nisl magna. Massa purus netus in sed si gravida malesuada. Natoque penatibus felis vel duis aliquet.</p>
          
          </div>
      </div>
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      address: { type: String },
      gclink: { type: String },
      photo: { type: String },
      icon: { type: String },
      ubereatslink: { type: String },
      doordashlink: { type: String },
      bitesquadlink: { type: String },
      three52deliverylink: { type: String },
      cflink: { type: String },
      blurb: { type: String }
    }
  }
}

customElements.define('biz-card', BizCard);