class CustomModal extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        #border {
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
        }
      </style>
      <div id="border">
        <div id="modal">
          <img src="${this.avatar_url}" alt="cant call image"/>
          <p id="user-id"></p>
        </div>
      </div>
    `
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
  }
}

customElements.define('custom-modal', CustomModal);
