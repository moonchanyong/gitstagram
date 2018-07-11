import CodeSnippet from './codeModule';

document.addEventListener('DOMContentLoaded', () => {
  console.log('ckpt');
  CodeSnippet.qs('custom-search-bar').renderSubject.subscribe((data) => {
     CodeSnippet.qs('item-list').renderRx.next(data);
  });

});
