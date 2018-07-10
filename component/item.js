class CustomItem extends HTMLElement {
  constructor() {
    super();
    this.avatar_url = 'assets/GitHub-Mark-32px.png';
    this.update = {
    };
  }

  // FIXME: 동적으로 와칭 속성을 바꾸지 못한다. 다른 와칭방벙을 찾아야한다.
  static get observedAttributes() {
    return ['avatar_url', 'login'];
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = `
      <style>
      </style>
      <div id="container">
      </div>
    `
  }

  setChildElement(html) {
    this.shadowRoot.querySelector('#container').innerHTML = html;
  }

  setChildStyle(style) {
    this.shadowRoot.querySelector('style').innerHTML = style;
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
    this.update[attrName](newVal);
  }
}

customElements.define('custom-item', CustomItem);
