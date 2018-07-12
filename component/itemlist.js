import CodeSnippet from '../src/codeModule';
import SimpleRx from '../src/SimpleRx';
import CustomModal from './modal'

/**
 * @ko custom Item들을 포함하는 List Component
 */
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
    this.noOneImg = `
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3TADqxBVbfLLSKFjp9GJGEHOAtAytI30bSoVHM2ZIVoWnY9WS4g");
      height: 100vh;
    `
  }

  connectedCallback() {
    this.innerHTML = this.template;
    this.renderRx.subscribe(this.render.bind(this, this.children));

    // custom Item 클릭시 custom-modal 오픈
    this.addEventListener('click', ({target}) =>  {
      if(!!target.login)
      document.body.appendChild(new CustomModal(target.login, target.avatar_url));
    });

    // child Element의 img가 다 로드 되었을때.
    this.addEventListener('loaded', () =>  {
      this.limit-=1;
      if(!this.limit) this.callLoadComplete();
    }, true);
  }

  callLoadComplete() {
    document.dispatchEvent(new Event('loaded'));
  }

  /**
   * @ko 입력받은 데이터로 뷰를 조작하는 함수
   * @param { HTMLCollection } components custom-item set
   * @param { Array<String> } userData list of user's pic
   * @param { Number } listNum number of showing component
   */
  render(components, { userData, listNum }) {
    let idx = 0;
    let limit = (listNum >  userData.length)? userData.length:listNum;
    this.loadedCount = limit;
    if(!limit) this.callLoadComplete();

    this.parentElement.style = (!userData.length)? this.noOneImg:`background-image: none`;

    for(let idx = 0; idx < components.length; idx+=1) {
      CodeSnippet.setAtt(components[idx], 'avatar_url', undefined);
      CodeSnippet.setAtt(components[idx], 'login', undefined);
      components[idx].style = (limit > idx)? 'display: block':'display: none';
      if (limit > idx) {
        CodeSnippet.setAtt(components[idx], 'avatar_url', userData[idx]['avatar_url']);
        CodeSnippet.setAtt(components[idx], 'login', userData[idx]['login']);
      }
    }
  }
}

customElements.define('item-list', ItemList);
