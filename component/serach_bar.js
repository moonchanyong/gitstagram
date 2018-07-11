import CodeSnippet from '../src/codeModule'
import SimpleRx from '../src/SimpleRx';

class CustomSerachBar extends HTMLElement {
  constructor() {
    super();
    this.idSubject = new SimpleRx();
    this.limitSubject = new SimpleRx(5);
    this.renderSubject = new SimpleRx();
    this.template = `
      <style>
        #search-bar {

        }

        #logo {
          width: 200px;
          height: 100px;
        }

        .border-line {
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
        }
      </style>
      <section id="search-bar" class="border-line">
        <img id="logo" src="assets/GitHub_Logo.png" alt="사실은 옥토캣이 하고 싶었다." />
        <input id="id_area" placeholder="아이디" />
        <input id="list_num_area" value="5" />
      </section>
    `
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = this.template;
    const gitHubURI = 'https://api.github.com/search/users'
    const $id_area = this.shadowRoot.querySelector('#id_area');
    const $list_num_area = this.shadowRoot.querySelector('#list_num_area');
    let prevId = '';

    $id_area.onkeyup = CodeSnippet.debounce(({target}) => {
      let val = $id_area.value;
      if(!val || prevId === val) return;
      prevId = val;
      let query = `${gitHubURI}?q=${val}&sort=followers&order=asc`;
      CodeSnippet.fetchGet(query).then(({items}) => {
        this.idSubject.next(items);
      });
    });

    $list_num_area.onkeyup = CodeSnippet.debounce(({target}) => {
      let val = $list_num_area.value;
      if(!Number(val) || val > 10 || val < 1 ) return;
      this.limitSubject.next(Number(val));
    });

    this.renderSubject.watch((a, b) => {
      let stream = {}
      stream['userData'] = a.getValue();
      stream['listNum'] = b.getValue();
      this.renderSubject.next(stream);
    }, this.idSubject, this.limitSubject);

  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
  }
}

customElements.define('custom-search-bar', CustomSerachBar);
