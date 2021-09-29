import request from "./request";
export default class Client {
  constructor(options: any) {
    this.setup();
  }

  private setup() {
    this.watch();
  }

  // 监听pushState跳转
  private onpushstatechange(callback) {
    const bindEventListener = function (type) {
      const historyEvent = history[type];
      return function () {
        const newEvent = historyEvent.apply(this, arguments);
        const e: any = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return newEvent;
      };
    };
    history.pushState = bindEventListener("pushState");
    window.addEventListener("pushState", callback);
  }

  private watch() {
    window.onload = (e) => {
      this.send(e);
    };
    window.onhashchange = (e) => {
      this.send(e);
    };
    const self = this;
    this.onpushstatechange(function (e) {
      self.send(e);
    });
    window.onerror = (e) => {
      this.send(e);
    };
    window.onunload = (e) => {
      this.send(e);
    };
  }

  private send(payload: any) {
    request(payload);
  }
}
