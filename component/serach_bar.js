import CodeSnippet from '../src/codeModule'
import SimpleRx from '../src/SimpleRx';

/**
 * @ko input에 들어오는 값들을 SimpleRx를 통해 제공하는 컴포넌트
 */
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


    /**
     * add input's value EventListener
     */
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
    /**
     * @ko 등록된 subject에서 하나라도 이벤트가 발생하면 등록한 subscribe 발생
     */
    this.renderSubject.watch((idSubject, limitSubject) => {
      let stream = {}
      stream['userData'] = idSubject.getValue();
      stream['listNum'] = limitSubject.getValue();
      this.renderSubject.next(stream);
    }, this.idSubject, this.limitSubject);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
  }
}

customElements.define('custom-search-bar', CustomSerachBar);
