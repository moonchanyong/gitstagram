import CodeSnippet from '../src/codeModule';
import SimpleRx from '../src/SimpleRx';
import CustomModal from './modal'

class ItemList extends HTMLElement {
  constructor() {
    super();
    this.renderRx = new SimpleRx();
    this.avatar_url = 'assets/GitHub-Mark-32px.png';
    this.template = `
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
  }

  connectedCallback() {
    this.innerHTML = this.template;
    this.renderRx.subscribe(this.render.bind(this, this.children));

    this.addEventListener('click', ({target}) =>  {
      if(!!target.login)
      document.body.appendChild(new CustomModal(target.login, target.avatar_url))
    });
  }

  render(componenets, {userData, listNum}) {
    let idx = 0;
    let noOneImg = `
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3TADqxBVbfLLSKFjp9GJGEHOAtAytI30bSoVHM2ZIVoWnY9WS4g");
      height: 100vh;
    `
    this.parentElement.style = (!userData.length)? noOneImg:`background-image: none`;
    CodeSnippet.each(componenets, (component) => {
      component.style = (listNum > idx && userData.length > idx)? 'display: block':'display: none';
      if (userData.length > idx) {
        component.setAttribute('avatar_url', userData[idx]['avatar_url']);
        component.setAttribute('login', userData[idx]['login']);
      } else{
        component.setAttribute('avatar_url', this.avatar_url);
        component.setAttribute('login', 'No Result');
      }
      idx++;
    });
  }
}

customElements.define('item-list', ItemList);
