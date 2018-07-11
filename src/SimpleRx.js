import CodeSnippet from './codeModule';

/**
 * @ko 데이터 갱신을 이벤트로 핸들링 하기위한 모듈
 */
export default class SimpleRx {
  /**
   * @param { Any } val @ko 객체에 할당 할 값
   * @return { Object } 사용자가 사용 할 API
   */
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
