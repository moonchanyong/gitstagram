// TODO: import SimpleRx with webpack
const gitHubURI = 'https://api.github.com/search/users'
const idSubject = new SimpleRx();
const limitSubject = new SimpleRx();

function qs(selector) {
  return document.querySelector(selector);
}

function on(el, type, handler, capture) {
  el.addEventListener(type, handler, !!capture);
}

function delegate() {

}

function setAtt(el, key, val){
  el.setAttribute(key, val);
  return el
}

function fetchGet(uri) {
  return fetch(uri, {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }).then(response => response.json())
  .catch(err => { throw new Error(`error in fetchGet ${err}`)})
}

function debounce(func, wait = 100, immediate = false) {
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

document.addEventListener('DOMContentLoaded', () => {
  const $id_area = qs('#id_area');
  const $list_num_area = qs('#list_num_area');
  $id_area.onkeyup = debounce(({target}) => {
    // 공백체크
    if(!target.value) return;
    let query = `${gitHubURI}?q=${target.value}&sort=followers&order=asc`;
    fetchGet(query).then(({items}) => {console.log(items)});
  });

  $list_num_area.onkeyup = debounce((e) => {
    //something
  });
})
