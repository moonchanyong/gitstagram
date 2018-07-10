document.addEventListener('DOMContentLoaded', () => {
  const $id_area = qs('#id_area');
  const $list_num_area = qs('#list_num_area');
  const $custom_list = qs('#custom-list');
  const gitHubURI = 'https://api.github.com/search/users'
  const idSubject = new SimpleRx();
  const limitSubject = new SimpleRx(5);
  const renderSubject = new SimpleRx();
  let prevId = '';
  $id_area.onkeyup = debounce(({target}) => {
    if(!target.value || prevId === target.value) return;
    prevId = target.value;
    let query = `${gitHubURI}?q=${target.value}&sort=followers&order=asc`;
    fetchGet(query).then(({items}) => {
      idSubject.next(items);
    });
  });

  $list_num_area.onkeyup = debounce(({target}) => {
    if(!Number(target.value) || target.value > 10 || target.value < 1 ) return;
    limitSubject.next(Number(target.value));
  });

  renderSubject.watch((a, b) => {
    let detail = {}
    detail['userData'] = a.getValue();
    detail['listNum'] = b.getValue();
    $custom_list.dispatchEvent(new CustomEvent('renewData', {detail}));
  }, idSubject, limitSubject);


  each(document.querySelectorAll('custom-item'), (component) => {
  let inner_html = `
    <img src="${component.avatar_url}" alt="no image" class="inline" />
    <p id="user-id" class="inline"></p>
  `
  let style= `
    #container {
      position: relative;
      white-space:nowrap;
      margin-top: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      width: 90vw;
      height: 10vh;
      cursor: pointer;
    }

    img {
      height: 100%;
    }

    .inline {
      display: inline-block;
    }

    #user-id {
      position: absolute;
      top:0;
      margin: 5px 10px;
    }
  `
    component.setChildElement(inner_html);
    component.setChildStyle(style);
    component.update = {
      avatar_url: (uri)=> { component.shadowRoot.querySelector('img').setAttribute('src',  `${uri}`);},
      login: (txt) => { component.shadowRoot.querySelector('p').innerText = txt;},
    }
  });
});
