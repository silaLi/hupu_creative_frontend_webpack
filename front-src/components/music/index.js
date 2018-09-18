let HTML = require("./index.html");
let STYLE = require("./index.less");

import $ from "jquery";
import { thorough } from "../../lib/css-module-aisle";

const empty = () => {};
export class Music {
  constructor() {
    this.DOM = $(thorough(HTML, STYLE, false));
    this.elem = this.DOM[0];
    this.audio = new Audio();
    this.audio.src = "http://minisite-d.hupucdn.com/mns_nfl2018_tune_in_bgm_20180903.mp3";
    this.audio.loop = true;

    this.event();
  }
  event() {
    this.DOM.find(`.${STYLE["music-off"]}`).on("click", () => {
      this.audio.play()
    })
    this.DOM.find(`.${STYLE["music-on"]}`).on("click", () => {
      this.audio.pause();
    })
    this.audio.onplay = () => {
      this.onPlay();
      this.DOM.removeClass(STYLE["off"]).addClass(STYLE["on"]);
    }
    this.audio.onpause = () => {
      this.onPause();
      this.DOM.removeClass(STYLE["on"]).addClass(STYLE["off"]);
    }
    if (window.WeixinJSBridge) {
      window.WeixinJSBridge.invoke('getNetworkType', {},  () => {
        this.audio.play()
      }, false);
    } else {
      document.addEventListener("WeixinJSBridgeReady",  () => {
        window.WeixinJSBridge.invoke('getNetworkType', {}, () => {
          this.audio.play()
        });
      }, false);
    }
  }
  init($selector) {
    $selector.append(this.DOM[0])
    return this;
  }
  play(){
    this.audio.play();
  }
  pause(){
    this.audio.pause();
  }
  onPlay = empty
  onPause = empty
}
export const music = new Music()