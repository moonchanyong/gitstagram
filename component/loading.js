/**
 * @ko 사용자 체감성능 향상을 위한 로딩컴포넌트
 */
export default class Loading extends HTMLElement {
  constructor() {
    super();
    this.state = 'stop';
    this.update ={
      state: this.handleState.bind(this),
    }

    this.template = `
    <style>
      @keyframes moving-packman {
        from { left: -10%; }
        to { left: 100%; }
      }
      svg {
        display: none;
        position: absolute;
        animation-name: moving-packman;
        animation-duration: 0.3s;
        animation-iteration-count: initial;

      }
    </style>
      <svg width="200px"  height="200px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-pacman" style="background: none;"><g ng-attr-style="display:{{config.showBean}}" style="display:block"><circle cx="57.8" cy="50" r="4" ng-attr-fill="{{config.c2}}" fill="#0a0a0a"><animate attributeName="cx" calcMode="linear" values="95;35" keyTimes="0;1" dur="1" begin="-0.67s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" calcMode="linear" values="0;1;1" keyTimes="0;0.2;1" dur="1" begin="-0.67s" repeatCount="indefinite"></animate></circle><circle cx="78.2" cy="50" r="4" ng-attr-fill="{{config.c2}}" fill="#0a0a0a"><animate attributeName="cx" calcMode="linear" values="95;35" keyTimes="0;1" dur="1" begin="-0.33s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" calcMode="linear" values="0;1;1" keyTimes="0;0.2;1" dur="1" begin="-0.33s" repeatCount="indefinite"></animate></circle><circle cx="38" cy="50" r="4" ng-attr-fill="{{config.c2}}" fill="#0a0a0a"><animate attributeName="cx" calcMode="linear" values="95;35" keyTimes="0;1" dur="1" begin="0s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" calcMode="linear" values="0;1;1" keyTimes="0;0.2;1" dur="1" begin="0s" repeatCount="indefinite"></animate></circle></g><g ng-attr-transform="translate({{config.showBeanOffset}} 0)" transform="translate(-15 0)"><path d="M50 50L20 50A30 30 0 0 0 80 50Z" ng-attr-fill="{{config.c1}}" fill="#28292f" transform="rotate(4.5 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path><path d="M50 50L20 50A30 30 0 0 1 80 50Z" ng-attr-fill="{{config.c1}}" fill="#28292f" transform="rotate(-4.5 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path></g></svg>
    `
  }

  /**
   * @ko 와칭할 속성 변경시 attributeChangedCallback 콜
   */
  static get observedAttributes() {
    return ['state'];
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = this.template;
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
    this.update[attrName](newVal, oldVal);
  }

  handleState(state) {
    switch(state) {
      case 'loading':
        this.shadowRoot.querySelector('svg').style = `display: unset`
        break;
      default:
        this.shadowRoot.querySelector('svg').style = `display: none`
        break;
    }
  }
}

customElements.define('custom-loading', Loading);
