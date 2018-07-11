document.addEventListener('DOMContentLoaded', () => {

  qs('custom-search-bar').renderSubject.subscribe((data) => {
     qs('item-list').renderRx.next(data);
  });

});
