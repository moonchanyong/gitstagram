import CodeSnippet from './codeModule';
import SimpleRx from '../src/SimpleRx';
import Loading from '../component/loading'
import CustomModal from '../component/modal'
import CustomItem from '../component/item'
import CustomSerachBar from '../component/serach_bar';
import ItemList from '../component/itemlist';
import QuerySave from './QuerySave';

document.addEventListener('DOMContentLoaded', () => {
  webPreferences: {
    webSecurity: false
  }
  const loading = new Loading();
  const searchBar = CodeSnippet.qs('custom-search-bar');
  const itemList = new ItemList(CustomItem);
  const gitHubURI = 'https://api.github.com/search/users'

  document.body.appendChild(itemList);
  document.body.appendChild(loading);

  // item list 기능추가
  itemList.renderRx = new SimpleRx();
  itemList.render = (components, userData) => {
    CodeSnippet.pairEach(components, userData, (component, data) => {
      CodeSnippet.setAtt(component, 'avatar_url', data['avatar_url']);
      CodeSnippet.setAtt(component, 'login', data['login']);
    });
  }
  itemList.renderRx.subscribe(itemList.render.bind(itemList, itemList.children));

  function getData(idValue, listNum) {
    const query = `${gitHubURI}?q=${idValue}&sort=followers&order=asc`;
    return new Promise((resolve, reject) => {
      const localData = QuerySave.getPrevQuery(query);
      if(localData) {
        resolve(localData);
      } else {
        CodeSnippet.fetchGet(query).then(({items}) => {
          QuerySave.setPrevQuery(items, query);
          resolve(items);
        });
      }
    });
  }

  // 서치바에서 아이템 리스트로 입력 전달
  searchBar.renderSubject.subscribe(({idValue, listNum}) => {
    getData(idValue, listNum).then((userData) => {
      let limit = (listNum >  userData.length)? userData.length:listNum;
      if(!!limit) {
        CodeSnippet.setAtt(loading, 'state', 'loading');
        const loadedHandler = function loadedHandler(){
          limit-=1;
          if(!limit) {
            document.removeEventListener('loaded', loadedHandler);
          }
          CodeSnippet.setAtt(loading, 'state', 'stop');
        }
        document.addEventListener('loaded', loadedHandler);
      }

      itemList.setItem(limit);
      itemList.renderRx.next(userData);
    });
  });

  // custom Item 클릭시 custom-modal 오픈
  itemList.addEventListener('click', ({target}) =>  {
    if(!!target.login)
      document.body.appendChild(new CustomModal(target.login, target.avatar_url));
  });
});
