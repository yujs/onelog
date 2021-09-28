import request from "./request";
export class Client {
  constructor(options:any) {
    this.setup();
  }

  private setup() {
    this.watch();
  }

  private watch() {
    window.onload = (e) => {
      this.send(e);
    };
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
