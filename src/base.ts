import init from "./index";

const current = document.currentScript;
const appkey = current.getAttribute("appkey");
init({ appkey });
