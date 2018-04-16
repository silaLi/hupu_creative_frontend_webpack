import weui from 'weui.js';
import './index.scss';
import $ from "zepto";
import * as _ from 'lodash';
import FastClick from "fastclick";

import { assetMap } from '../../assets/assetUtil';

import { Page } from '../../lib/Page.js';
import { routes } from '../../lib/page-router';
import { APP } from '../app';
import { ComputeCharLength } from '../../lib/util';
let HTML = require('./index.html');

export class GameEntry extends Page {
  initPageElem(){
    this.DOM = $(HTML);

    this.openMinScreenHeight();
  }
  initPageEvent(){

  }
  pageElemAppend(){
    this.PDOM = $('#app');
    this.PDOM.append(this.DOM);
    FastClick.attach(this.DOM[0]);
  }
  showafter(){
    this.DOM.addClass("prev-animation")
    this.DOM.find(".next").on("click", () => {
      const name = this.DOM.find(".name-input").val().toString();
      const nameLength = ComputeCharLength(name);
      if(name === ""){
        weui.alert("请填写昵称");
        return
      }
      if(name.indexOf(" ") > -1 && nameLength > 12){
        weui.alert("昵称不能包涵空格，并长度不能超过6个中文字符或者12个英文字符");
        return;
      }
      APP.name = name;
      this.goNext();
    })
  }
  showFirstBefore(){
    this.setImage();
  }
  showbefore(){
    this.modeChange('fixed');
  }
  hideafter(){
    this.DOM.removeClass("prev-animatin next-animation")
  }
  setImage(){
    if(this.__setImage_complete){
      // 已经执行过了
      return
    }
    this.__setImage_complete = true;
    
    let bgImageHTML = "";
    for (let i = 1; i <= 10; i++) {
      bgImageHTML += `<img src="${assetMap.get(`bg_game-part_${i}`)}" />`;
    }
    for (let i = 1; i <= 10; i++) {
      bgImageHTML += `<img src="${assetMap.get(`bg_game-part_${i}`)}" />`;
    }
    this.DOM.find(".bg").html(bgImageHTML);

    this.DOM.find(".logo").attr("src", assetMap.get("logo"))
    this.DOM.find(".kv").attr("src", assetMap.get("GameEntryKv"))
    this.DOM.find(".next img").attr("src", assetMap.get("GameEntryNext"))
  }
  goNext(){
    this.DOM.addClass("next-animation");
    setTimeout(() => {
      routes.go("GAME")
    }, 800)
  }
}
