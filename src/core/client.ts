import request from "./request";
import Cookie from "js-cookie";
import { v4 as uuid } from "uuid";

import { CookieModel } from "../types/cookie";

export default class Client {
  constructor(options: any) {
    this.setup();
  }

  private setup() {
    this.setCookies();
    this.watch();
  }

  private setCookies() {
    const key = "onelog";
    const current = new Date();
    const expires = { expires: 50 * 365 };
    if (Cookie.get(key)) {
      const model: CookieModel = JSON.parse(Cookie.get(key));
      model.last_time = current.valueOf();
      Cookie.set(key, JSON.stringify(model), expires);
    } else {
      const model: CookieModel = {
        id: uuid(),
        last_time: current.valueOf(),
        first_time: current.valueOf(),
      };
      Cookie.set(key, JSON.stringify(model), expires);
    }
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
