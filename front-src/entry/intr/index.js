import './index.scss'
import $ from "zepto";
import * as _ from 'lodash';
import FastClick from "fastclick";

import { Page } from '../../lib/Page.js';
import { assetMap } from '../../assets/assetUtil';

import { routes } from "../../lib/page-router"
let HTML = require('./index.html');

export class Intr extends Page {
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
  showbefore(){
    this.modeChange('fixed');
  }
  setImage(){
    if(this.__setImage_complete){
      // 已经执行过了
      return
    }
    this.DOM.find(".bg").attr("src", assetMap.get("bgCommon"))
    this.DOM.find(".logo").attr("src", assetMap.get("logo"))
    this.DOM.find(".kv").attr("src", assetMap.get("intrKv"))
    this.DOM.find(".next img").attr("src", assetMap.get("intrNext"))
  }
  showFirstBefore(){
    this.setImage();
  }
  showafter(){
    this.DOM.addClass("prev-animation")
    this.DOM.find(".next").one("click", () => {
      this.goNext();
    })
  }
  hideafter(){
    this.DOM.removeClass("prev-animatin next-animation")
  }
  goNext(){
    this.DOM.addClass("next-animation");
    setTimeout(() => {
      routes.go("GAME_ENTRY")
    }, 800)
  }
}