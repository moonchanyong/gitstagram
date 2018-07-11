import CodeSnippet from './codeModule';

document.addEventListener('DOMContentLoaded', () => {
  CodeSnippet.qs('custom-search-bar').renderSubject.subscribe((data) => {
     CodeSnippet.qs('item-list').renderRx.next(data);
  });
});
