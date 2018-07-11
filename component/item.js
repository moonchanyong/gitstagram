class CustomItem extends HTMLElement {
  constructor() {
    super();
    this.avatar_url = 'assets/GitHub-Mark-32px.png';

    this.update = {
      avatar_url: (uri)=> {
        this.shadowRoot.querySelector('img').setAttribute('src',  `${uri}`);
      },
      login: (txt) => { this.shadowRoot.querySelector('p').innerText = txt;},
    };

    this.template = `
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

  static get observedAttributes() {
    return ['avatar_url', 'login'];
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = this.template;
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
    this.update[attrName](newVal);
  }
}

customElements.define('custom-item', CustomItem);
