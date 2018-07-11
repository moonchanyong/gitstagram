import CodeSnippet from './codeModule';

export default class SimpleRx {
  constructor(val) {
    this.val = val;
    this._handler = [];

    let obj = {};
    obj.getValue = this.getValue.bind(this);
    obj.next = this.next.bind(this);
    obj.subscribe = this.subscribe.bind(this);
    obj.watch = this.watch.bind(this);
    return obj;
  }

  getValue() {
    return this.val;
  }

  next(val) {
    this.val = val;
    // TODO: 메소드 -> 함수로 변경
    CodeSnippet.each(this._handler, (f) => {f(val)});
  }

  subscribe(f) {
    this._handler.push(f);
  }

  watch(handler, ...args) {
    CodeSnippet.each(args, (subject) => {
      subject.subscribe(() => {
        handler(...args);
      })
    })
  }
}
