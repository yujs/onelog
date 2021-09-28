import { init } from "./app";
const current = document.currentScript;
const appkey = current.getAttribute("appkey");
init({ appkey });
