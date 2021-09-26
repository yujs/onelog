import request from "./request";
export class Client {
  constructor(options:any) {
    this.setup();
  }

  private setup() {
    this.watch();
  }

  private watch() {
    window.onload = (e) => {};
    window.onerror = (e) => {
      this.send(e);
    };
    window.onunload = (e) => {};
  }

  private send(payload: any) {
    request(payload);
  }
}
