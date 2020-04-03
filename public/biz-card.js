import {LitElement, html, css} from 'lit-element';

class BizCard extends LitElement {

  constructor() {
    super();
    this.photo = 'placeholder-image.jpg';
  }

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
        background-position-y: center;
      }

      div.content {
        padding: var(--base-unit);
        text-align: center;
      }

      div.content h2 {
        font-weight: normal;
        padding: 0;
        margin: var(--base-unit) 0;
        text-align: center;
      }

      div.content h2 a {
        color: var(--emerald);
        text-decoration: underline;
      }

      div.content h2 small a {
       display: block;
       text-decoration: none;
       color: var(--concrete);
       font-size: 1.4rem;
       margin-top: calc(var(--base-unit)/4);
      }

      div.content h2 small a:hover {
        text-decoration: underline;
      }

      div.content .btn {
        display: inline-block;
        outline: none;
        cursor: pointer;
        color: var(--emerald);
        padding: var(--base-unit);
        margin-bottom: var(--base-unit);
        background: transparent;
        border: 1px solid var(--emerald);
        border-radius: 32px;
        text-decoration: none;
      }

      div.content .btn:hover {
        color: #fff;
        background: var(--emerald);
      }

      div.content p {
        padding: 0;
        margin: 0;
      }

      div.content ul.logo-list {
        list-style-type: none;
        text-align:center;
        padding: 0;
      }

      div.content ul.logo-list li {
        display: inline-block;
        margin: 0 8px;
      }

      div.content a.crowd-funding {
        display: block;
        text-align: center;
        color: var(--emerald);
      }
    `;
  }

  render() {
    let result = html`
      <div>
        <div class="photo" style="background-image: url(${this.photo || 'placeholder-image.jpg'})"></div>
        <div class="content">
          <h2>
            <a href="${this.website}" target="_blank">${this.name}</a>
            <small>
              <a target="_blank" href="https://www.google.com/maps/place/?q=place_id:${this.place_id}">
                ${this.address}
              </a>
            </small>
          </h2>
          ${this.gclink !== '' ? html` <a href="${this.gclink}" class="btn" target="_blank">Purchase gift cards</a>` : ''}
          ${this.blurb !== '' ? html`<p>${this.blurb}</p>` : ''}
          <ul class="logo-list">
            ${this.ubereatslink !== '' ? html`<li><a href="${this.ubereatslink}" target="_blank" title="Uber Eats"><svg width="48" height="35" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path d="M22.335 28.828c0-1.999-1.598-3.569-3.616-3.569-1.989 0-3.616 1.57-3.616 3.569 0 1.998 1.627 3.568 3.616 3.568 2.018 0 3.616-1.57 3.616-3.568m2.95-5.843V34.68h-3.007v-1.056a5.922 5.922 0 01-3.806 1.351c-3.56 0-6.338-2.73-6.338-6.147 0-3.407 2.788-6.148 6.338-6.148 1.437 0 2.76.485 3.806 1.351v-1.046h3.008zm9.993 9.04h-2.265c-.685 0-1.133-.295-1.133-.923V25.63h3.388v-2.645H31.88v-3.331h-3.035v3.33H26.56v2.656h2.284v6.214c0 1.57 1.132 2.817 3.169 2.817h3.254v-2.646h.01zm6.852 2.95c3.473 0 5.434-1.627 5.434-3.873 0-1.599-1.161-2.788-3.588-3.302l-2.57-.514c-1.484-.266-1.96-.542-1.96-1.085 0-.704.714-1.132 2.037-1.132 1.437 0 2.484.38 2.788 1.675h3.007c-.161-2.437-1.96-4.064-5.595-4.064-3.14 0-5.349 1.275-5.349 3.74 0 1.704 1.218 2.817 3.835 3.36l2.865.647c1.132.218 1.437.513 1.437.97 0 .733-.857 1.19-2.236 1.19-1.732 0-2.732-.38-3.112-1.675h-3.036c.447 2.436 2.293 4.063 6.043 4.063M0 18.835h11.334v2.703h-8.27v3.873h8.051v2.627h-8.05v3.92h8.27v2.703H0V18.835z" fill="#06C167"/><path d="M47.25 6.329V4.206h-.81c-1.284 0-2.236.59-2.807 1.513V4.292H41.33v11.525h2.322V9.269c0-1.789 1.104-2.94 2.627-2.94h.97zM30.539 8.993c.418-1.76 1.865-2.94 3.587-2.94 1.723 0 3.179 1.17 3.57 2.94h-7.157zm3.635-4.92a5.983 5.983 0 00-6.034 5.986c0 3.435 2.713 6.014 6.243 6.014 2.142 0 3.893-.923 5.063-2.464l-1.684-1.218c-.876 1.151-2.027 1.694-3.388 1.694a3.917 3.917 0 01-3.892-3.274h9.554v-.742c.01-3.445-2.474-5.996-5.862-5.996M20.889 14.085c-2.256 0-4.054-1.79-4.054-3.997 0-2.237 1.817-3.997 4.054-3.997 2.208 0 4.025 1.76 4.025 3.997.01 2.207-1.808 3.997-4.025 3.997m-6.329 1.741h2.303V14.38c1.057 1.065 2.56 1.713 4.188 1.713 3.454 0 6.166-2.694 6.166-6.015 0-3.34-2.712-6.033-6.166-6.033a5.874 5.874 0 00-4.169 1.713V0H14.56v15.826zM6.386 13.97c2.236 0 3.959-1.694 3.959-4.206V0h2.417v15.817h-2.398V14.35c-1.085 1.104-2.58 1.742-4.264 1.742-3.454 0-6.1-2.465-6.1-6.196V0h2.427v9.764c0 2.56 1.703 4.206 3.959 4.206" fill="#142328"/></g></svg></a></li>` : ''}
            ${this.doordashlink !== '' ? html`<li><a href="${this.doordashlink}" target="_blank" title="DoorDash Food Delivery"><svg width="48" height="28" xmlns="http://www.w3.org/2000/svg"><path d="M46.138 6.455A12.176 12.176 0 0035.346 0H1.172a1.177 1.177 0 00-.825 2.007l7.444 7.487a3.502 3.502 0 002.484 1.032h24.092a3.107 3.107 0 11.063 6.214H17.82a1.177 1.177 0 00-.83 2.007l7.449 7.491a3.497 3.497 0 002.484 1.033h7.512c9.773 0 17.164-10.45 11.703-20.821" fill="#FF3008" fill-rule="nonzero"/></svg></a></li>` : ''}
            ${this.bitesquadlink !== '' ? html`<li><a href="${this.bitesquadlink}" target="_blank" title="Bite Squad"><svg width="58" height="36" xmlns="http://www.w3.org/2000/svg"><path d="M14.678 20.519c.796 0 1.457.173 1.984.52.527.346.937.818 1.23 1.419v-1.61H22V36h-4.192v-5.35a3.72 3.72 0 01-1.31 1.128c-.541.285-1.165.429-1.872.429-.958 0-1.796-.266-2.514-.795-.718-.53-1.268-1.238-1.652-2.125a7.18 7.18 0 01-.576-2.887c0-1.032.187-1.996.56-2.893.375-.897.924-1.62 1.648-2.167.724-.547 1.585-.821 2.585-.821zm24.786-.015c1.197 0 2.21.22 3.04.657a4.37 4.37 0 011.876 1.854c.422.798.633 1.739.633 2.82v6.029h-4.1v-1.188a2.99 2.99 0 01-1.209 1.118 3.693 3.693 0 01-1.719.398c-.659 0-1.249-.148-1.77-.445a3.16 3.16 0 01-1.218-1.234 3.6 3.6 0 01-.438-1.776c0-.727.16-1.354.48-1.88.319-.527.762-.928 1.33-1.203.568-.276 1.219-.414 1.953-.414 1.129 0 1.992.333 2.591.997-.007-.749-.221-1.315-.643-1.696-.421-.381-1.04-.572-1.855-.572a5.355 5.355 0 00-1.832.308 5.13 5.13 0 00-1.463.794v-3.4a7.731 7.731 0 011.988-.848 8.665 8.665 0 012.356-.319zM58 16v15.828h-4.16V30.54c-.286.264-.583.572-.912.838-1.538 1.245-4.367 1.15-5.873-.905l-.137-.199c-1.344-2.06-1.52-4.314-.818-6.657.552-1.84 2.026-3.285 4.184-3.304 1.346-.012 2.441.492 3.294 1.57.036.046.075.091.14.17l.054.065V16H58zM4.895 20.504c.864 0 1.613.097 2.249.291a7.156 7.156 0 011.728.78v2.987a7.314 7.314 0 00-1.702-.747 6.229 6.229 0 00-1.754-.26c-.375 0-.652.05-.831.149-.18.099-.27.233-.27.403 0 .162.066.29.198.386.132.096.375.18.73.25l1.325.264c1.958.375 2.937 1.474 2.937 3.296 0 .756-.204 1.427-.612 2.013-.408.586-.992 1.046-1.754 1.377-.761.333-1.649.498-2.662.498a7.893 7.893 0 01-2.269-.333 8.067 8.067 0 01-2.096-.97v-3.252c.551.416 1.207.764 1.969 1.043.76.28 1.417.419 1.968.419.693 0 1.04-.22 1.04-.657a.502.502 0 00-.23-.435c-.152-.106-.396-.198-.729-.275l-1.172-.276c-.986-.226-1.726-.59-2.219-1.091C.247 25.863 0 25.17 0 24.287c0-.763.195-1.429.586-1.998.391-.568.955-1.008 1.694-1.319.737-.31 1.61-.466 2.615-.466zm22.04.328v5.902c0 .622.104 1.094.311 1.416.207.32.546.481 1.015.481.925 0 1.387-.67 1.387-2.013v-5.786h4.202v11.032h-4.09V30.2c-.272.572-.696 1.045-1.27 1.42a3.501 3.501 0 01-1.953.561c-1.264 0-2.213-.406-2.845-1.218-.632-.812-.949-1.925-.949-3.339v-6.792h4.192zm12.723 6.486c-.4 0-.722.103-.964.312a1.033 1.033 0 00-.362.821c0 .34.12.61.358.81.238.202.56.303.968.303.394 0 .718-.106.97-.318a1.01 1.01 0 00.377-.805c0-.325-.124-.594-.372-.805-.25-.213-.573-.318-.975-.318zm-23.88-2.887c-.314 0-.593.08-.835.24-.243.161-.432.388-.569.683a2.389 2.389 0 00-.206 1.023c0 .394.069.735.206 1.022.137.288.326.51.569.665.242.154.518.232.827.232.473 0 .853-.174 1.142-.52.29-.345.433-.814.433-1.409 0-.582-.143-1.05-.429-1.404-.285-.355-.664-.532-1.138-.532zm35.399-.02c-.91 0-1.646.863-1.646 1.928s.737 1.93 1.646 1.93c.91 0 1.646-.865 1.646-1.93s-.737-1.929-1.646-1.929zM33.635 4.62c1.744 0 3.074.462 3.99 1.383C38.543 6.925 39 8.27 39 10.038v1.382h-6.96c.24.454.636.806 1.19 1.056.551.252 1.264.377 2.136.377 1.16 0 2.21-.271 3.15-.815v2.806c-.453.338-1.049.615-1.787.831-.737.217-1.58.325-2.527.325-1.324 0-2.478-.234-3.46-.702-.981-.467-1.734-1.135-2.26-2-.524-.868-.787-1.886-.787-3.054 0-1.108.246-2.086.737-2.935a5.079 5.079 0 012.08-1.981c.895-.47 1.936-.707 3.123-.707zM4.27.23v5.957c.101-.118.15-.172.195-.229.862-1.049 1.967-1.54 3.325-1.528 2.18.019 3.667 1.424 4.224 3.215.71 2.282.531 4.475-.825 6.482-1.107 1.636-3.058 2.124-4.64 1.743a4.067 4.067 0 00-4.474-3.983A2.243 2.243 0 00.158 9.36L0 9.344V.229h4.269zm20.478.927V4.94h2.573v3.384h-2.573v7.355h-4.232V8.325h-2.358V4.94h2.358v-2.98l4.232-.805zM17.403 4.94v10.74H13.17V4.94h4.232zM6.923 8.186c-.918 0-1.663.841-1.663 1.878 0 1.038.745 1.879 1.663 1.879s1.662-.84 1.662-1.878c0-1.038-.744-1.879-1.662-1.879zm26.857-.542c-.522 0-.939.143-1.251.428-.312.286-.496.683-.551 1.192h3.521c-.027-.53-.188-.932-.484-1.208-.295-.274-.707-.412-1.235-.412zM15.292 0c.439 0 .827.086 1.163.258.336.172.596.41.778.716.182.307.273.66.273 1.058 0 .413-.097.777-.289 1.093a1.91 1.91 0 01-.792.728 2.493 2.493 0 01-1.133.253 2.54 2.54 0 01-1.153-.253 1.91 1.91 0 01-.793-.728 2.063 2.063 0 01-.288-1.093c0-.399.093-.751.278-1.057.187-.308.458-.556.782-.717.336-.172.728-.258 1.174-.258z" fill="#00BD70" fill-rule="evenodd"/></svg></a></li>` : ''}
            ${this.three52deliverylink !== '' ? html`<li><a href="${this.three52deliverylink}" target="_blank" title="352 Delivery"><svg width="48" height="36" xmlns="http://www.w3.org/2000/svg"><path d="M45.696 36l.736-.464c.432-.272.912-.768 1.152-1.184l.416-.704V2.352l-.416-.704c-.24-.416-.72-.912-1.152-1.184L45.696 0H2.304l-.736.464C1.136.736.656 1.232.416 1.648L0 2.352v31.296l.416.704c.24.416.72.912 1.152 1.184l.736.464h43.392zM9.984 25.04c-.224-.56-.384-.672-.608-.432-.064.064-.32.112-.544.112-.336 0-.432.08-.432.4 0 .48-.512.64-.656.208-.368-1.152-.384-1.168-1.12-1.168-.56 0-.688.064-.736.32-.064.416-.352.464-.432.08-.096-.56-.528-1.04-.912-1.04-.32 0-.384.08-.384.48 0 .576-.256.624-.512.096-.128-.32-.32-.416-.832-.448-.656-.048-.656-.048-1.184-1.312-.32-.72-.576-1.648-.624-2.192l-.096-.96 5.216.096.192.784c.144.528.4.976.848 1.408.528.544.768.672 1.44.736 1.776.16 3.04-1.088 2.88-2.848-.16-1.568-1.392-2.704-2.976-2.72h-.688l.048-1.808.048-1.792.832-.08c.576-.064.96-.208 1.232-.464.512-.48.784-1.68.56-2.464C10.384 9.456 9.6 8.64 9.2 8.64c-.112 0-.256-.112-.304-.256-.128-.336-.128-3.808.016-4.144.16-.448 2.112-.256 3.312.32 1.184.56 2.096 1.456 2.624 2.624.352.736.432 1.2.48 2.544.08 1.904-.16 2.88-1.008 4.048l-.528.736.784.656c.496.448.944 1.04 1.296 1.744.512 1.056.528 1.136.528 3.088 0 1.68-.048 2.096-.304 2.56l-.304.56-.144-.528c-.112-.4-.224-.512-.528-.512-.4 0-.4.016-.416 1.392-.016.992-.048 1.248-.128.848-.064-.304-.192-.704-.288-.88-.208-.368-.32-.192-.4.64-.048.48-.128.512-.64.32-.208-.08-.288-.032-.288.192 0 .496-.176.544-.496.16-.208-.272-.32-.304-.48-.16-.096.096-.288.144-.4.096-.128-.048-.224 0-.224.096s-.176.176-.4.176c-.288 0-.4.08-.4.32 0 .512-.32.368-.576-.24zm26.784-12.88H31.36v-.528c0-.848.592-2.928 1.072-3.84.624-1.12 1.792-2.368 2.736-2.88.848-.464 2.24-.88 2.96-.896L38.56 4v4.72l-.512.24c-.8.384-1.152.976-1.216 2.16l-.064 1.04zm.656 13.76c-.08 0-.144-.224-.144-.48 0-.368-.096-.528-.384-.64-.208-.08-.464-.272-.56-.432-.144-.272-.16-.272-.256 0a.508.508 0 01-.416.272c-.192 0-.384.176-.496.432-.176.432-.176.432-.304-.336-.144-.912-.352-1.104-1.056-.992-.288.048-.528.016-.528-.064 0-.064 1.328-1.712 2.944-3.648 1.616-1.936 3.152-3.84 3.424-4.24 1.024-1.472 1.632-3.728 1.328-4.864-.256-.928-.816-1.68-1.504-2.016l-.592-.304V6.416c0-1.216.048-2.256.112-2.304.144-.16.672-.144 1.664.048 2.352.448 4.448 2.272 5.296 4.608.256.704.32 1.328.336 2.752.032 3.136-.608 4.4-3.856 7.712-1.328 1.36-1.92 2.064-1.776 2.128.128.048 1.488.096 3.024.112l2.8.048v1.792c0 1.072-.064 1.824-.16 1.84-.08.032-.176-.144-.208-.384-.064-.592-.352-.576-.352.016 0 .464-.32.88-.432.56-.032-.096-.304-.128-.608-.096-.368.048-.56 0-.56-.128 0-.16-.048-.16-.24 0-.16.128-.48.16-.928.096-.656-.096-.72-.16-.896-.736-.144-.464-.272-.64-.496-.64-.208 0-.32.112-.32.32 0 .48-.224.384-.512-.208-.224-.48-.304-.528-.848-.464-.656.08-.864.416-.896 1.44l-.016.592-.192-.72c-.112-.4-.272-.72-.384-.704a3.65 3.65 0 01-.432.032c-.144.016-.24.192-.24.416 0 .608-.192 1.376-.336 1.376zM2.08 11.056v-.48c0-.784.608-2.48 1.248-3.472.928-1.44 2.016-2.256 3.712-2.8 1.303-.425 1.43-.568 1.44.982v3.13l-.56.272c-.656.304-1.056.88-1.184 1.68l-.096.592-2.288.048-2.272.048zM29.776 9.6h-3.882c-2.19-.005-2.374-.042-2.374-.288 0-.784.528-4.128.672-4.304.128-.16.8-.208 2.832-.176l2.656.048.048 2.352.048 2.368zM17.6 25.136c0-.208-.16-.416-.384-.528-.32-.128-.384-.256-.32-.592.032-.224.176-1.2.304-2.16.128-.96.256-1.776.288-1.808.032-.016.464.256.944.64.48.384 1.344.896 1.904 1.168.864.384 1.216.464 2.32.464 1.152 0 1.36-.048 1.968-.448 1.264-.848 1.632-2.496.912-4.048-.208-.448-.624-1.008-.912-1.232-1.296-.96-3.36-1.2-5.312-.592-.608.192-1.136.32-1.168.272-.048-.048 1.2-9.392 1.456-10.8l.096-.512h1.984c1.104 0 2 .016 2 .032 0 .032-.208 1.552-.464 3.408-.256 1.84-.432 3.408-.4 3.472.032.048.8.096 1.712.08 1.552-.032 1.696 0 2.688.48 1.936.96 3.248 2.736 3.744 5.12.384 1.792.256 3.552-.256 3.68a.604.604 0 00-.352.384c-.096.368-1.056.416-1.6.08-.208-.128-.592-.192-.944-.144l-.608.08v1.344c0 1.152-.048 1.376-.272 1.456-.16.048-.4.192-.528.288-.128.112-.4.256-.592.304-.352.112-.368.064-.368-.656 0-.416-.064-.864-.144-.976-.16-.272-1.088-.304-1.328-.064-.112.112-.4.192-.64.192-.432 0-.448.032-.448.768 0 .432-.048.816-.096.864-.048.064-.352 0-.672-.144-.544-.224-.944-.224-1.744.032-.352.112-.368.08-.368-.864v-.26c-.006-.826-.086-.822-1.152-.924l-.752-.064-.048 1.2c-.032.784-.112 1.232-.24 1.28-.128.032-.208-.08-.208-.272zm21.902 6.65c-.576 0-1.016-.157-1.32-.47-.409-.385-.613-.94-.613-1.663 0-.738.204-1.293.613-1.663.304-.313.744-.47 1.32-.47.577 0 1.017.157 1.321.47.407.37.61.925.61 1.663 0 .724-.203 1.278-.61 1.662-.304.314-.744.47-1.32.47zm-4.487 0c-.58 0-1.035-.186-1.367-.558-.332-.374-.497-.886-.497-1.537 0-.704.188-1.246.566-1.627.328-.332.745-.498 1.252-.498.678 0 1.174.223 1.487.668.174.25.267.5.28.752h-.843l-.044-.136a.965.965 0 00-.166-.302c-.154-.175-.38-.262-.681-.262a.844.844 0 00-.725.37c-.177.247-.265.597-.265 1.049 0 .452.093.79.28 1.016a.886.886 0 00.712.337c.296 0 .52-.096.676-.29.086-.103.157-.26.213-.467h.834l-.038.183c-.09.357-.264.653-.521.889-.3.275-.684.413-1.153.413zm8.182-.112h-.785v-4.031h1.225l.732 3.168.728-3.168h1.211v4.03h-.784v-2.79l.002-.265.002-.1.001-.227v.003l-.763 3.38h-.817l-.758-3.38v.136l.002.088v.1c.003.125.003.226.004.302v2.754zm-40.02 0H1.44v-4.031h1.736l.18.008c.171.012.32.039.444.08.282.093.511.263.686.51.14.201.236.418.287.652.051.233.077.455.077.667 0 .536-.108.99-.323 1.362-.292.5-.742.752-1.35.752zm5.736 0H5.859v-4.031h2.956v.714H6.682v.856H8.64v.7H6.682v1.036h2.231v.725zm3.845 0H9.919v-4.031h.842v3.306h1.997v.725zm1.703 0h-.837v-4.031h.837v4.03zm2.994 0h-.795l-1.362-4.031h.9l.874 3.06.884-3.06h.875l-1.376 4.03zm5.305 0h-3.054v-4.031h2.955v.714H20.53v.856h1.957v.7H20.53v1.036h2.23v.725zm1.848 0h-.823v-4.031h1.977l.162.007c.205.014.369.046.49.097.153.064.282.158.387.282a1.105 1.105 0 01.284.763c0 .19-.048.38-.144.564a.81.81 0 01-.479.393c.186.074.318.18.395.318.078.138.117.348.117.63v.374c.003.129.01.22.021.272.022.104.073.18.154.23v.1h-.927l-.023-.083a1.985 1.985 0 01-.067-.48l-.006-.374-.005-.122c-.016-.19-.06-.321-.136-.392-.09-.086-.26-.129-.507-.129h-.87v1.58zm5.253 0h-.842v-1.515l-1.395-2.516h.993l.837 1.756.8-1.756h.955l-1.348 2.516v1.515zm9.641-.602a.962.962 0 00.795-.37c.196-.245.294-.595.294-1.05 0-.451-.098-.8-.294-1.048a.96.96 0 00-.794-.37c-.334 0-.6.123-.799.369-.199.246-.298.596-.298 1.05 0 .454.1.804.298 1.05.199.246.465.369.798.369zm-36.468-.098c.398 0 .675-.196.831-.588.086-.215.129-.472.129-.769 0-.41-.064-.725-.193-.944-.128-.22-.384-.33-.767-.33h-.776v2.63zm22.529-1.548c.19 0 .331-.022.426-.066.168-.076.252-.228.252-.454 0-.244-.081-.408-.244-.492-.09-.047-.227-.071-.41-.071h-.979v1.083zm6.609 2.248h-.829v-.815h.829v.815z" fill="#C00000" fill-rule="nonzero"/></svg></a></li>` : ''}
          </ul>
          ${this.cflink !== '' ? html` <a href="${this.cflink}" target="_blank" class="crowd-funding">Consider supporting our crowdfunding campaign</a>` : ''}
        </div>
      </div>
    `;
    return result;
  }

  firstUpdated(changedProperties) {

    var gnv = new google.maps.LatLng(29.6516, -82.3248);
    let map = new google.maps.Map(document.getElementById('map'), {
      center: gnv,
      zoom: 17
    });

    let places = new google.maps.places.PlacesService(map);

    // TODO: this will stop getting photos after 10 requests
    places.getDetails({
      placeId: this.place_id,
      fields: ['photos'],
    }, (place, status) => {
      if (place) {
        this.photo = place.photos[0].getUrl({maxWidth:600});
      } else {
        // wait a second, then try again
        window.setTimeout(() => {
          this.firstUpdated(changedProperties);
        }, 1000);
      }
    });

  }

  static get properties() {
    return {
      place_id: { type: String },
      name: { type: String },
      address: { type: String },
      website: { type: String },
      url: { type: String },
      photo: { type: String },
      blurb: { type: String },
      gclink: { type: String },
      icon: { type: String },
      ubereatslink: { type: String },
      doordashlink: { type: String },
      bitesquadlink: { type: String },
      three52deliverylink: { type: String },
      cflink: { type: String },
    }
  }
}

customElements.define('biz-card', BizCard);