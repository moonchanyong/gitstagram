class CustomModal extends HTMLElement {
  constructor(login, avatar_url) {
    super();
    this.login = login;
    this.avatar_url = avatar_url;
    this.template = `
      <style>
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
    this.callRepos(this.login).then((data) => {this.render(data, 5)});
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = this.template;
    this.addEventListener('click', ({target}) => {target.remove()});
  }

  async callRepos(username) {
    let ret = [];
    await fetchGet(`https://api.github.com/users/${username}/repos`)
      .then((datas)=> map(datas, ({name}) => name))
      .then((arr) => { ret = [...arr] });
    return ret;
  }

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
