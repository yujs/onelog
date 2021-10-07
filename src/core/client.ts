import request from "./request";
import Cookie from "js-cookie";
import { v4 as uuid } from "uuid";

import { CookieModel } from "../types/cookie";
import { ExtendedError } from "../types/error";
import { Event, EventType } from "../types/Event";

export default class Client {
  constructor(options: any) {
    this.setup();
  }

  private setup() {
    this.setCookies();
    this.watch();
  }

  // 初始化cookie
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

  // 事件监听
  private watch() {
    const self = this;
    window.addEventListener("load", function (e) {
      self.send("pageview", e);
    });
    window.addEventListener("hashchange", function (e) {
      self.send("pageview", e);
    });
    this.onpushstatechange(function (e) {
      self.send("pageview", e);
    });
    window.addEventListener(
      "error",
      function ({
        lineno,
        filename,
        colno,
        error: { stack, message: baseMessage },
        message,
      }) {
        const error: ExtendedError = {
          lineno,
          filename,
          colno,
          stack,
          message: baseMessage,
          name: message.split(":")[0],
        };
        self.send("error", error);
      }
    );
    window.addEventListener("unload", function (e) {
      self.send("pageview", e);
    });
  }

  private send(type: EventType, payload: any) {
    const time = new Date().valueOf();
    const event: Event = {
      event_id: uuid(),
      time,
      type,
      payload,
      title: document.title,
    };
    console.log(event);
    request(event);
  }
}
