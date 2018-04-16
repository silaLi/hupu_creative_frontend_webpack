import './index.scss'
import $ from "zepto";
import * as _ from 'lodash';
import FastClick from "fastclick";
import weui from 'weui.js';

import { assetMap } from '../../assets/assetUtil';

import { Page } from '../../lib/Page.js';
import { GameProcess } from './game-ctrl';
import { SendPhoneAjax } from '../ajax';
import { APP } from '../app';
import { CheckPhone } from '../../lib/util';
let HTML = require('./index.html');

export class Game extends Page {
  initPageElem(){
    this.DOM = $(HTML);

    this.openMinScreenHeight();
  }
  initPageEvent(){
    this.DOM.find(".game-restart").on("click", () => {
      this.startGame();
    });
    this.DOM.find(".invite-friends").on("click", () => {
      this.inviteFriends();
    });
    this.DOM.find(".record-phone-float .icon-close").on("click", () => {
      this.closeRecordPhone();
    })
    this.DOM.find(".invite-friends-float").on("click", () => {
      this.closeInviteFriends();
    })
    this.DOM.find(".record-phone-float .submite-phone").on("click", () => {
      this.submitePhone();
    })
  }
  submitePhone(){
    const phone = this.DOM.find(".record-phone-float .phone-input").val();
    if(!CheckPhone(phone)){
      weui.alert("请输入合法的手机号");
      return;
    }
    SendPhoneAjax(phone, this.gameProcess._score, () => {
      this.setTop5(
        _.map(APP.top5_list, (item, index) => {
          item = {...item, nickname: item.name, score: item.goal, rank: index + 1};
          return item;
        })
      );
      this.closeRecordPhone();
    });
  }
  pageElemAppend(){
    this.PDOM = $('#app');
    this.PDOM.append(this.DOM);
    FastClick.attach(this.DOM[0]);
  }
  showbefore(){
    this.modeChange('percent');
    this.gameProcess = new GameProcess(this.DOM.find(".game-container"));
    this.gameProcess.setRate(this.PDOM.width() / this.__visitHeight);

    if(assetMap._complete_sign == false){
      assetMap.setComplete(() => {
        this.gameProcess.init();
        this.startGame();
        // this.stopGame();
      })
      assetMap.preLoad();
    }else{
      this.gameProcess.init();
      this.startGame();
    }
    this.gameProcess.onStop = () =>{
      this.stopGame()
    }
  }
  setStopScore(score){
    this._score = score;
    let scoreArr = score.toString().split("");
    let scoreHTML = "";

    let width = scoreArr.length * (74 - 14) + 14;
    
    while(scoreArr.length != 0){
      scoreHTML += `<img src="${assetMap.get(`font-image-${scoreArr[0]}`)}"/>`;
      scoreArr = scoreArr.slice(1);
    }
    if(width <= 260){
      this.DOM.find(".stop-score").html(`<div>${scoreHTML}</div>`);
    }else{
      let transformScale = `scale(${260/width})`;
      this.DOM.find(".stop-score").html(`<div style="transform: ${transformScale};-webkit-transform: ${transformScale};">${scoreHTML}</div>`);
    }
  }
  /**
   * 设置top排行榜
   * @param {array} top5Arr 
   */
  setTop5(top5Arr){
    if(top5Arr.length == 0){
      this.DOM.find(".top5-elem").html(`<div class="no-rank">没有人参加</div>`);
      return;
    }
    let top5HTML = "";
    top5Arr = top5Arr.sort((a, b) => {
      return a.rank - b.rank;
    });
    top5Arr.forEach((item, index) => {
      top5HTML += `<div class="top5-item">
                    <img class="top5-rank" src="${assetMap.get(`font-image-${item.rank}`)}" alt="">
                    <div class="top5-name">${item.nickname}</div>
                    <div class="top5-score">${item.score}</div>
                  </div>`;
      ;
    });
    this.DOM.find(".top5-elem").html(top5HTML);
  }
  stopGame(){
    let score = this.gameProcess._score;
    const goal_baseline = APP.goal_baseline || 100;
    const isTop5 = score > goal_baseline;
    if(isTop5){
      this.DOM.addClass("game-stopped game-record-phone")
    }else{
      this.DOM.addClass("game-stopped")
    }
    this.setStopScore(this.gameProcess._score);
    let top5 = _.map(APP.top5_list, (item, index) => {
      item = {...item, nickname: item.name, score: item.goal, rank: index + 1};
      return item;
    });
    this.setTop5(top5);
  }
  startGame(){
    this.DOM.removeClass("game-stopped game-invite-friends game-record-phone")
    this.gameProcess.start();
  }
  closeRecordPhone(){
    this.DOM.removeClass("game-record-phone")
  }
  inviteFriends(){
    this.DOM.addClass("game-invite-friends")
  }
  closeInviteFriends(){
    this.DOM.removeClass("game-invite-friends")
  }
  showFirstBefore(){
    this.setImage();
  }
  setImage(){
    if(this.__setImage_complete){
      // 已经执行过了
      return
    }
    this.__setImage_complete = true;
    this.DOM.find(".logo").attr("src", assetMap.get("logo"))
    this.DOM.find(".stop-kv-image").attr("src", assetMap.get("gameStopKv"))
    this.DOM.find(".invite-friends-kv-image").attr("src", assetMap.get("inviteFriendsKv"))
    this.DOM.find(".record-phone-kv-image").attr("src", assetMap.get("recordPhoneKv"))
  }
}