function qs(selector) {
  return document.querySelector(selector);
}

function on(el, type, handler, capture) {
  el.addEventListener(type, handler, !!capture);
}

function setAtt(el, key, val){
  el.setAttribute(key, val);
  return el
}

function each(list, iter) {
  if(!iter || !list) return;
  for(let _i = 0; _i < list.length; _i++) {
    iter(list[_i]);
  }
}

function delegate() {

}

function fetchGet(uri) {
  return fetch(uri, {
    method: 'GET',
    mode: 'cors',
    cache: 'force-cache'
  }).then(response => response.json())
  .catch(err => { throw new Error(`error in fetchGet ${err}`)})
}

function debounce(func, wait = 500, immediate = false) {
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

function keys(obj = {}) {
  let ret = [];
  for(let i in obj) {
    ret.push(i);
  }
  return ret;
}
