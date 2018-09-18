import $ from "jquery";
import { thorough } from "../../lib/css-module-aisle";
import { isAndroid } from "../../lib/util";

let style = require("./index.less");
let HTML = require("./index.html");

export class Video{
  constructor(source){
    this.__HTML = HTML.replace(/\{\{source\}\}/gi, source);
    this.__style = style;

    this.source = source;
    this.clearOthers();
    if(isAndroid()){
      this.initAndroidPlayer();
    }else{
      this.initPlayer();
    }
    this.initEvent();
  }
  initPlayer(){
    this.$elem = $(`<video controls="controls" preload="auto" src="${this.source}"></video>`).appendTo("body")
    this.$elem.hide();
    this.video = this.$elem[0];
  }
  initAndroidPlayer(){
    this.$elem = $(thorough(this.__HTML, this.__style, false)).appendTo("body");
    this.$elem.hide();
    this.video = this.$elem.find(`.${this.__style["video"]}`)[0]

    this.$elem.find(`.${style["icon-close"]}`).on("click", () => {
      this.destory();
    })
    return this;
  }
  clearOthers(){
    $(`.${style["component-mark"]}`).remove();
  }
  initEvent(){
    this.$elem.addClass(style["component-mark"]);
    this.video.onended = () => {
      this.destory();
    }
    this.video.onpause = () => {
      this.destory();
    }
  }
  destory(){
    this.video.pause();
    this.video.onended = null;
    this.$elem.remove();
  }
  play(){
    this.$elem.show();
    this.video.play();
  }
}