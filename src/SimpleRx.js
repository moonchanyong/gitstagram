class SimpleRx {

  constructor(val) {
    this.val;
    this._handler = [];

    // next, subscribe
    let obj = {};
    obj.getValue = this.getValue.bind(this);
    obj.next = this.next.bind(this);
    obj.subscribe = this.subscribe.bind(this);
    return obj;
  }

  getValue() {
    return this.val;
  }

  next(val) {
    this.val = val;

    // TODO: 메소드 -> 함수로 변경
    this._handler.forEach((f) => {f(val)});
  }

  subscribe(f) {
    this._handler.push(f);
  }
}
