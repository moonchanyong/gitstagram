class CustomItem extends HTMLElement {
  constructor() {
    super();
    this.avatar_url = 'assets/GitHub-Mark-32px.png';
    this.update = {
      avatar_url:this._convertSrc.bind(this),
      login:this._convertInnerText.bind(this),
    };
  }

  static get observedAttributes() {
    return ['avatar_url', 'login'];
  }

  connectedCallback() {

    this.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        #container {
          position: relative;
          white-space:nowrap;
          margin-top: 10px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          width: 90vw;
          height: 10vh;
          cursor: pointer;
        }

        img {
          height: 100%;
        }

        .inline {
          display: inline-block;
        }

        #user-id {
          position: absolute;
          top:0;
          margin: 5px 10px;
        }
      </style>

      <div id="container">
        <img src="${this.avatar_url}" alt="no image" class="inline" />
        <p id="user-id" class="inline"></p>
      </div>
      `
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
    this.update[attrName](newVal);
  }
  _convertSrc(uri) {
    this.shadowRoot.querySelector('img').setAttribute('src',  `${uri}`);
  }
  _convertInnerText(txt) {
    this.shadowRoot.querySelector('p').innerText = txt;
  }
}

customElements.define('custom-item', CustomItem);
