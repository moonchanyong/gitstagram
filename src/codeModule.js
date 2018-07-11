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

  delegate() {

  }

  fetchGet(uri) {
    return fetch(uri, {
      method: 'GET',
      mode: 'cors',
      cache: 'force-cache'
    }).then(response => response.json())
    .catch(err => { throw new Error(`error in fetchGet ${err}`)})
  }

  debounce(func, wait = 500, immediate = false) {
  	let timeout;
  	return function() {
  		let context = this;
      let args = arguments;
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
