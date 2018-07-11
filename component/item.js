/**
 * @ko 아이템 리스트 내의 아이템이 되는 컴포넌트, 깃헙 유저의 사진과 아이디 노출
 */
class CustomItem extends HTMLElement {
  constructor() {
    super();
    // default image
    this.avatar_url = 'assets/GitHub-Mark-32px.png';

    /**
     * @ko 속성 변경시 update function set
     */
    this.update = {
      // avatar_url변경 시 child의 img를 바꾼다.
      avatar_url: (uri)=> {
        this.shadowRoot.querySelector('img').setAttribute('src',  `${uri}`);
      },
      // login: 유저아이디, 변경시 child의 p의 innerText 갱신
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
  /**
   * @ko 와칭할 속성 변경시 attributeChangedCallback 콜
   */
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
