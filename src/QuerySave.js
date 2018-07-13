class QuerySave {

  get expireDate() {
    let currentTime = new Date();
    currentTime.setDate(currentTime.getDate() + 1);
    return currentTime.getTime();
  }

  getPrevQuery(...query) {
    let ret = JSON.parse(localStorage.getItem(query.join('/'))) || undefined;
    if(!ret || !ret.expire) return undefined;
    if (ret.expire < (new Date()).getTime()) localStorage.removeItem(query);
    return ret.data;
  }

  setPrevQuery(data, ...query) {
    localStorage.setItem(query.join('/'), JSON.stringify({ data, expire: this.expireDate }));
  }
}
module.exports = new QuerySave();
