class ItemList extends HTMLElement {
  constructor() {
    super();
    this.renderRx = new SimpleRx();
    this.avatar_url = 'assets/GitHub-Mark-32px.png';
  }
  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    this.innerHTML = `
    <custom-item style="display: none"> </custom-item>
    <custom-item style="display: none"> </custom-item>
    <custom-item style="display: none"> </custom-item>
    <custom-item style="display: none"> </custom-item>
    <custom-item style="display: none"> </custom-item>
    <custom-item style="display: none"> </custom-item>
    <custom-item style="display: none"> </custom-item>
    <custom-item style="display: none"> </custom-item>
    <custom-item style="display: none"> </custom-item>
    <custom-item style="display: none"> </custom-item>
    `
    this.addEventListener('renewData',({detail}) => {
      this.renderRx.next(detail);
    });
    this.renderRx.subscribe(this.render.bind(this, this.children));
  }

  each(list, iter) {
    if(!iter || !list) return;
    for(let _i = 0; _i < list.length; _i++) {
      iter(list[_i]);
    }
  }

  render(componenets, {userData, listNum}) {
    let idx = 0;

    this.each(componenets, (component) => {
      component.style = (listNum > idx)? 'display: block':'display: none';
      if(listNum > idx) {
        if (userData.length > idx) {
          component.setAttribute('avatar_url', userData[idx]['avatar_url']);
          component.setAttribute('login', userData[idx]['login']);
        } else {
          component.setAttribute('avatar_url', this.avatar_url);
          component.setAttribute('login', 'No Result');
        }
        idx++;
      }
    });
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    // 속성이 추가/제거/변경되었다.
    this[attrName] = newVal;
  }
}

customElements.define('item-list', ItemList);
