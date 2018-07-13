import CodeSnippet from '../src/codeModule';
import Loading from './loading';
/**
 * @ko custom-item을 클릭 했을때 나타나는 modal component
 */
export default class CustomModal extends HTMLElement {
  /**
   * @ko 사용자에게 보여 줄 템플릿 생성
   * @param { String } login user Id
   * @param { string } avatar_url user's pic
   */
  constructor(login, avatar_url) {
    super();
    this.login = login;
    this.avatar_url = avatar_url;
    this.noLawn = document.createElement('p');
    this.noLawn.innerText = 'no Lawn';
    this.cors = document.createElement('p');
    this.cors.innerText = 'CORS';
    this.template = `
      <style>
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
        .circle {
          box-sizing: border-box;
          width: 100px !important;
          height: 100px !important;
          border-radius: 100%;
          border: 10px solid rgba(255, 255, 255, 0.2);
          border-top-color: #FFF;
          animation: spin 1s infinite linear;
        }
        #border {
          position: fixed;
          top: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.8);
        }
        #modal {
          margin: 10vh auto;
          height: 500px;
          width: 1000px;
          display: block;
          position: relative;
        }
        p {
          color: white;
          font-weight: bold;
          font-size: 16pt;
          text-align: center;
        }
        .in-box {
          display: inline-block;
          height: 500px;
          width: 500px;
          text-align: center;
          position: absolute;
        }
        .nowrap {
          white-space: nowrap;
        }
        img {
          width: 200px;
          align-self:
        }
        #right-side {
          right:0;
        }
        #left-side {
          left:0
        }
        svg {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background-color: white;
          padding: 10px;
        }
        #lawn {
          background-color: white;
        }
      </style>
      <div id="border">
        <div id="modal">
          <div id="left-side" class="in-box">
            <img src="${this.avatar_url}" alt="cant call image"></img>
            <p id="user-id">${this.login}</p>
          </div>
          <div id="right-side" class="in-box">
          </div>
        </div>
      </div>
    `
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = this.template;
    this.addEventListener('click', ({target}) => {target.remove()});

    // 유저 깃 정보 렌더링
    this.shadowRoot.querySelector('#right-side').classList.add('circle');
    this.callRepos(this.login).then((data) => {
      this.render(data, 5);
      this.shadowRoot.querySelector('#right-side').classList.remove('circle');
    });
    this.calllawn(this.login).then(svg => {
      if(!!svg) {
        this.shadowRoot.querySelector('#border').appendChild(svg);
      } else {
        this.shadowRoot.querySelector('#border').appendChild(this.noLawn);
      }
    }).catch(err => {
      this.shadowRoot.querySelector('#border').appendChild(this.cors);
    })
  }

  /**
   * GitHub API Call function
   * @param { String } login user Id
   * @return { Array<String> } user repo namelist
   */
  async callRepos(login) {
    let ret = [];

    await CodeSnippet.fetchGet(`https://api.github.com/users/${login}/repos`)
      .then((datas)=> CodeSnippet.map(datas, ({name}) => name))
      .then((arr) => { ret = [...arr] });
    return ret;
  }

  /**
   * GitHub API Call function
   * @param { String } login user Id
   * @return { HTMLElement } user's lawn
   */
  async calllawn(login) {
    const parser = new DOMParser();
    let ret;

    await CodeSnippet.fetchRawGet(`https://github.com/${login}`)
      .then(rsp => rsp.text())
      .then(txt => parser.parseFromString(txt, 'text/html'))
      .then(dom => dom.querySelector('.js-calendar-graph-svg'))
      .then((result) => {ret = result});
    return ret;
  }

  /**
   * render function
   * @param { Array<String> } data user repo namelist
   * @return { Number } limit Number of showing custom-item
   */
  render(data, limit) {
    let less = (data.length < limit)? data.length:limit;
    if(!less) {less++; data.push('no result') }
    let container = this.shadowRoot.querySelector('#right-side');
    this.shadowRoot.querySelector('#modal').classList.add('nowrap');
    for(let idx = 0; idx < less; idx++) {
      let pTag =  document.createElement('p');
      pTag.innerText = data[idx];
      container.appendChild(pTag);
    }
  }
}

customElements.define('custom-modal', CustomModal);
