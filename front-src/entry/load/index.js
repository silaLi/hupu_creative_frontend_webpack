import './index.scss'
import $ from "zepto";
import * as _ from 'lodash';
import FastClick from "fastclick";

import { Page } from '../../lib/Page.js';
import { AssetMap, assetMap } from '../../assets/assetUtil';
import { routes } from '../../lib/page-router';
import { music } from '../music';
let HTML = require('./index.html');

const loadAssetMap = new AssetMap();
export class Load extends Page {
  initPageElem(){
    this.DOM = $(HTML);
    this._loadPrecent = this.DOM.find(".precent-image");

    this.openMinScreenHeight();

    // 加载字体图片
    for (let index = 0; index < 10; index++) {
      loadAssetMap.push("font-image-"+ index, require(`../../static/font-image/${index}.png`));
    }
    loadAssetMap.push("font-image-%", require("../../static/font-image/precent.png"))
    // 加载背景图片
    loadAssetMap.push("bgCommon", require('../../static/bg_common.jpg'));
    loadAssetMap.push("loadSoccer", require('../../static/loading-soccer.png'));

    loadAssetMap.push("logo", require('../../static/logo.png'));
    
    this.cvs = this.DOM.find("#precent-image")[0];
    this.cvs.height = 77;
    this.ctx = this.cvs.getContext("2d");
  }
  initPageEvent(){
    // load 的资源加载完成后，就显示load-page，并开始加载h5的其他资源
    loadAssetMap.setComplete(() => {
      this.setLoadPrecent(0)
      music.appendTo($("body"));
      assetMap.preLoad();
      this.show();
    });
  }
  /**
   * 设置加载百分比
   * render fro canvas
   * 
   * @param {any} precent 
   * @memberof Load
   */
  setLoadPrecent(targetPrecent, callBack){
    this._curPrecent = this._curPrecent || 0;
    if(this._curPrecent >= targetPrecent){
      callBack && callBack()
      return;
    }
    this._curPrecent++;
    let precent = this._curPrecent;

    cancelAnimationFrame(this.___setLoadPrecentRequestAnimationFrame);
    this.___setLoadPrecentRequestAnimationFrame = requestAnimationFrame(() => {
      this.setLoadPrecent(targetPrecent, callBack);
    });
    let precentArr = precent.toString().split("");
    
    this.cvs.width = precentArr.length * (96 - 14) + 14 + 25;
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    let i = 0;
    while(precentArr.length > 0){
      this.ctx.drawImage(loadAssetMap.getDom("font-image-"+precentArr[0]), i * (96 - 14), 0, 90, 77);
      precentArr = _.tail(precentArr);
      i++;
    }
    this.ctx.drawImage(loadAssetMap.getDom("font-image-%"), i * (96 - 14), 77 - 25 - 8, 32, 25);
  }
  /**
   * 设置加载百分比
   * render fro dom
   * 
   * @param {any} precent 
   * @memberof Load
   */
  setLoadPrecentDom(targetPrecent, callBack){
    this._curPrecent = this._curPrecent || 0;
    if(this._curPrecent >= targetPrecent){
      callBack && callBack()
      return;
    }
    this._curPrecent++;
    let precent = this._curPrecent;

    clearTimeout(this.___setLoadPrecentRequestAnimationFrame);
    this.___setLoadPrecentRequestAnimationFrame = setTimeout(() => {
      this.setLoadPrecent(targetPrecent, callBack);
    }, 150);
    let precentArr = precent.toString().split("");
    let fontImageHTML = "";
    while(precentArr.length > 0){
      fontImageHTML += `<img src="${loadAssetMap.get("font-image-"+precentArr[0])}">`;
      precentArr = _.tail(precentArr);
    }
    fontImageHTML += `<img class="precent" src="${loadAssetMap.get("font-image-%")}">`;
    this._loadPrecent.html(fontImageHTML)
  }
  pageElemAppend(){
    this.PDOM = $('#app');
    this.PDOM.append(this.DOM);
    FastClick.attach(this.DOM[0]);
  }
  showafter(){

  }
  showbefore(){
    this.modeChange('fixed');
    // 显示load的进程
    assetMap.setProcess((percent, completeCount, totalCount) => {
      this.setLoadPrecent(Math.floor(percent * 100), () => {
        if(percent == 1){
          routes.pages.forEach(pageObj => {
            pageObj.page.setImage();
          })
          routes.go("INTR");
        }
      });
    });
  }
  showFirstBefore(){
    this.DOM.find(".bg").attr("src", loadAssetMap.get("bgCommon"))
    this.DOM.find(".soccer img").attr("src", loadAssetMap.get("loadSoccer"))
    this.DOM.find(".logo").attr("src", loadAssetMap.get("logo"))
    this.setLoadPrecent(0);
  }
  startPreload(){
    loadAssetMap.preLoad();
  }
  showCheck(){
    if(loadAssetMap._complete_sign === false){
      this.startPreload();
      return false;
    }
  }
}