import CodeSnippet from '../src/codeModule';

/**
 * @ko child Element를 관리하는 컨테이너
 * @ko child의 개수가 없을때 없음 표시를 해주는 컨테이너
 * @ko item 개수 조절
 */
export default class ItemList extends HTMLElement {
  constructor(type, ...args) {
    super();
    this.type = type;
    CodeSnippet.each(args, (set) => {set();});
    this.itemcount = 0;
    this.template = `
    `
    this.noOneImg = `
      background-position: center;
      background-repeat: no-repeat;
      background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3TADqxBVbfLLSKFjp9GJGEHOAtAytI30bSoVHM2ZIVoWnY9WS4g");
      height: 100vh;
    `
  }
  static get observedAttributes() {
    return [];
  }

  push() {
    this.appendChild(new this.type());
    this.itemcount += 1;
  }
  pop() {
    this.lastChild.remove();
    this.itemcount -= 1;
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
    this.update[attrName](newVal, oldVal);
  }

  connectedCallback() {
    this.innerHTML = this.template;
  }

  setItem(count) {
    count = Number(count);
    this.parentElement.style = (!count)? this.noOneImg:`background-image: none`;
    if (count < 0 || (!count && count!==0)) throw new Error('it\'s not valid parameter');
    while(count !== Number(this.itemcount)) {
      (count > this.itemcount)? this.push(): this.pop();
    }
  }
}

customElements.define('item-list', ItemList);
