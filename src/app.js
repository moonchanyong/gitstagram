import CodeSnippet from './codeModule';
import Loading from '../component/loading'
document.addEventListener('DOMContentLoaded', () => {
  let loading = new Loading();
  document.body.appendChild(loading);

  CodeSnippet.qs('custom-search-bar').renderSubject.subscribe((data) => {
    CodeSnippet.setAtt(loading, 'state', 'loading');
    CodeSnippet.qs('item-list').renderRx.next(data);
  });

  document.addEventListener('loaded', () => {
    CodeSnippet.setAtt(loading, 'state', 'stop');
  });

});
