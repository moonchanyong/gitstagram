class CodeSnippet {
  constructor(){
  }

  qs(selector) {
    return document.querySelector(selector);
  }

  on(el, type, handler, capture) {
    el.addEventListener(type, handler, !!capture);
  }

  setAtt(el, key, val){
    el.setAttribute(key, val);
    return el
  }

  each(list, iter) {
    if(!iter || !list) return;
    for(let _i = 0; _i < list.length; _i++) {
      iter(list[_i]);
    }
  }

  map(list, mapper) {
    let ret = [];
    this.each(list, (item) => {ret.push(mapper(item))});
    return ret;
  }

  fetchGet(uri) {
    return fetch(uri, {
      method: 'GET',
      mode: 'cors',
      cache: 'force-cache'
    }).then(response => response.json())
    .catch(err => { throw new Error(`error in fetchGet ${err}`)})
  }

  /**
   * @ko 일정시간 지연 후 함수콜, 만약 일정시간내에 콜이 일어나면 새로 콜이 일어난 시점부터 일정시간이 지나야 콜이 일어난다.
   * @param { Function } func @Function to debounce
   * @param { Number } wait delay time
   * @param { Boolean } immediate 즉시 실행 여부
   */
  debounce(func, wait = 500, immediate = false) {
  	let timeout;
  	return function(...args) {
  		let context = this;
  		let later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};

  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (immediate && !timeout) func.apply(context, args);
  	};
  };

  keys(obj = {}) {
    let ret = [];
    for(let i in obj) {
      ret.push(i);
    }
    return ret;
  }
}

module.exports = new CodeSnippet();
