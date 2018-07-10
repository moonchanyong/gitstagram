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

document.addEventListener('DOMContentLoaded', () => {
  const $id_area = qs('#id_area');
  const $list_num_area = qs('#list_num_area');
  const $custom_list = qs('#custom-list');
  const gitHubURI = 'https://api.github.com/search/users'
  const idSubject = new SimpleRx();
  const limitSubject = new SimpleRx(5);
  const renderSubject = new SimpleRx();

  $id_area.onkeyup = debounce(({target}) => {
    if(!target.value) return;
    let query = `${gitHubURI}?q=${target.value}&sort=followers&order=asc`;
    fetchGet(query).then(({items}) => {idSubject.next(items)});
  });

  $list_num_area.onkeyup = debounce(({target}) => {
    if(!Number(target.value) || target.value > 10 || target.value < 1 ) return;
    limitSubject.next(Number(target.value));
  });

  renderSubject.watch((a, b) => {
    $custom_list.dispatchEvent(new CustomEvent('renewData',
      {
        detail: {
          userData: a.getValue(),
          listNum: b.getValue(),
        }
      })
    );
  }, idSubject, limitSubject);
})
