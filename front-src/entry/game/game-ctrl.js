import { assetMap } from '../../assets/assetUtil';

import * as PIXI from "pixi.js";
import { Player } from './game-player';
import $ from "zepto";
import * as _ from 'lodash';
import { Background } from "./game-background.js";
import { Monster } from './game-monster';
import { norAudio, specialAudio } from '../../assets/audio';

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
PIXI.utils.sayHello(type)

export class GameProcess{
  constructor(gameContainer){
    this._gameLevelDefault = 2;
    this._gameLevel = this._gameLevelDefault;
    this._gameLevelMax = 10;
    this._gameLevelSpecail = 6;

    this._gameContainer = gameContainer;
    this._createMonsterInterval = 300;
    this._createMonsterIntervalAcceptableOffset = 500;
    this._state = "";


    this._monsterRateScore = 19;
    this._monsterRateFail = 5;
    this._monsterRateSpecial = 2;

    // 特殊模式持续时间
    this._specialModeDuration = 5 * 1000;
  }
  setGameLevel(level){
    this._gameLevel = level; 
    this._gameBackground.setSpeed(5 * this._gameLevel);
    this.monsters.forEach(monster => {
      monster.setSpeed(5 * this._gameLevel);
    })
  }
  /**
   * 初始化
   * 渲染游戏画面
   * 
   * @memberof GameProcess
   */
  init(){
    this._state = "initing";
    let app = new PIXI.Application({
      width: this._width,
      height: this._height,
      transparent: true
    });
    app.stop();
    this._gameContainer.find(".canvas-container").empty().append(app.view);
    this.DOM = $(app.view);

    this._gameBackground = new Background(this._gameContainer, app.stage);
    this._gameBackground.setSpeed(5 * this._gameLevel);

    this._player = new Player(app.stage);
    // 初始位置在中间距离下方 30px 处
    this._player.setPosition(320, this._height - this._player.height * .5 - 30);
    
    app.ticker.add(delta => this.gameLoop(delta));
    this._app = app;

    this.monsters = [];

    this.setScore(0);
    this._state = "inited"
  }
  /**
   * 开始创建怪物NPC
   * @return {[type]} [description]
   */
  startMonsterCreate(){
    let nextCreateMonsterTime = this._createMonsterInterval + Math.floor(this._createMonsterIntervalAcceptableOffset * Math.random() / this._gameLevel);
    clearTimeout(this._createMonsterSetTimeoutMark);
    this._createMonsterSetTimeoutMark = setTimeout(() => {
      this.monsterCreate();
      this.startMonsterCreate();
    }, nextCreateMonsterTime);
  }
  /**
   * 创建怪物NPC
   * @return {[type]} [description]
   */
  monsterCreate(){
    let monsterTypeArray = [...(_.fill(new Array(this._monsterRateScore), "nor"))]

    if(this._isSpecailMode != true){
      monsterTypeArray = [...monsterTypeArray, ...(_.fill(new Array(this._monsterRateFail), "fail")), ...(_.fill(new Array(this._monsterRateSpecial), "special"))]
    }
    const monsterTypeIndex = Math.floor(Math.random() * monsterTypeArray.length);
    const monsterType = monsterTypeArray[monsterTypeIndex];

    const monster = new Monster(this._app.stage);
    if(monsterType == "fail"){
      // 怪物触发失败
      monster.setMonster("fail");
    }else if(monsterType == "special"){
      // 特殊怪物
      monster.setMonster("special");
    }else if(monsterType == "nor"){
      // 普通得分
      // 随机得分怪物
      monster.setMonster(Math.floor(Math.random() * 9) + 1);
    }else{
      monster.setMonster(Math.floor(Math.random() * 9) + 1);
    }
    monster.setSpeed(5 * this._gameLevel);
    monster.start({x: 0, y: 0, w: this._width, h: this._height});

    this.monsters = [...this.monsters, monster];
  }
  /**
   * 停止创建NPC
   * @return {[type]} [description]
   */
  stopMonsterCreate(){
    clearTimeout(this._createMonsterSetTimeoutMark);
  }
  /**
   * 游戏进入特殊模式
   * @return {[type]} [description]
   */
  entrySpecialMode(){
    if(this._isSpecailMode == true){
      // 当前正处于特殊模式
      return 
    }
    this._isSpecailMode = true;
    this._player.openGodMode();
    this.___gameLevel = this._gameLevel;
    this.setGameLevel(this._gameLevelSpecail);

    clearTimeout(this._entrySpecialModeTimeoutMark);
    this._entrySpecialModeTimeoutMark = setTimeout(() => {
      this.quitSpecialMode();
    }, this._specialModeDuration)
  }
  /**
   * 退出特殊模式
   * @return {[type]} [description]
   */
  quitSpecialMode(){
    this._isSpecailMode = false;
    this.setGameLevel(this.___gameLevel);
    this._player.closeGodMode();
  }
  /**
   * 开始游戏
   * 设置初始得分
   * 背景开始滚动
   * 人物开启手势
   * 开启自动创建怪物（得分怪物，失败怪物）
   * 
   * @return {[type]} [description]
   */
  start(){
    this._state = "starting"
    this.setScore(0);
    this.setGameLevel(this._gameLevelDefault);
    this._gameBackground.start();
    // 初始位置在中间距离下方 30px 处
    this._player.setPosition(320, this._height - this._player.height * .5 - 30);
    this._player.changeState("nor")
    this._player.onGesture();
    this.monsters.forEach(monster => {
      monster.destory();
    })
    this.startMonsterCreate();
    this._app.start();
    this._state = "started"
  }
  /**
   * 停止游戏
   * 可以再玩一次
   * @return {[type]} [description]
   */
  stop(){
    this._state = "stopping"
    this._app.stop();
    this._state = "stopped"
    this.quitSpecialMode();
    this.stopMonsterCreate();
    this.onStop && this.onStop();
  }
  /**
   * 游戏失败
   * @return {[type]} [description]
   */
  fail(){
    this._player.changeState("fai");
    this.stop();
  }
  /**
   * 游戏终止
   * 不再开始
   * 
   * @return {[type]} [description]
   */
  end(){
    this._app.destroy();
    this._state = "ended";
  }
  /**
   * rate = width / height;
   * 
   * @param {any} rate 
   * @memberof GameProcess
   */
  setRate(rate){
    this._rate = rate;
    this._width = 640;
    this._height = this._width / this._rate;
  }
  gameLoop(){
    this._gameBackground.play();
    this.monsters = _.filter(this.monsters, monster => {
      monster.play();
      return monster._lived;
    })
    for (let i = this.monsters.length - 1; i >= 0; i--) {
      let monster = this.monsters[i];
      let hited = hitTest(this._player._sprite, monster._sprite)
      if(hited === true){
        if( monster._name == "fail"){
          if(this._player.isGod()){
            console.log("i'm god")
          }else{
            monster.destory();
            this.fail();
            return;
          }
        }
        if(monster._name == "special"){
          this.entrySpecialMode(monster._name)
          specialAudio.play();
        }
        if(monster._typeName == "nor"){
          norAudio.play();
        }
        this.setScore(this._score + monster._score)
        monster.destory();
      }
    }
  }
  /**
   * 设置得分
   * 
   * @param {any} score 
   * @memberof GameProcess
   */
  setScore(score){
    // 得分没有变化
    if(this._score == score){
      return
    }
    this._score = score;
    let scoreArr = score.toString().split("");
    let scoreHTML = "";
    
    while(scoreArr.length != 0){
      scoreHTML += `<img src="${assetMap.get(`font-image-${scoreArr[0]}`)}"/>`;
      scoreArr = scoreArr.slice(1);
    }
    // 显示最新得分
    this._gameContainer.find(".score").replaceWith(`<div class="score">${scoreHTML}</div>`);
  }
  /**
   * 测试函数
   */
  autoChangeState(){
    var i = 0;
    setInterval(() => {
      i++;
      i = i % this._player._playerSpriteList.length;
     this._player.changeState(this._player._playerSpriteList[i].name);
    }, 500);
  }
}

function hitTest(mainSprite, secondSprite) {
  const possiblity = hitPossiblyTest(mainSprite, secondSprite);
  if(possiblity){
    return hitPreciselyTest(mainSprite, secondSprite)
  }else{
    return possiblity;
  }
}

function hitPossiblyTest(mainSprite, secondSprite){
  let mainMaxX, mainMinX, mainMaxY, mainMinY,
      secondMaxX, secondMinX, secondMaxY, secondMinY;
  let mainRotation = 0;
  if(mainRotation == 0){
    // 没有旋转的时候
    mainMinX = mainSprite.x - mainSprite.pivot.x;
    mainMaxX = mainSprite.x - mainSprite.pivot.x + mainSprite.width;
    mainMinY = mainSprite.y - mainSprite.pivot.y;
    mainMaxY = mainSprite.y - mainSprite.pivot.y + mainSprite.height;
  }else{
    // 有旋转的时候
  }
  let secondRotation = 0;
  if(secondRotation == 0){
    // 没有旋转的时候
    secondMinX = secondSprite.x - secondSprite.pivot.x;
    secondMaxX = secondSprite.x - secondSprite.pivot.x + secondSprite.width;
    secondMinY = secondSprite.y - secondSprite.pivot.y;
    secondMaxY = secondSprite.y - secondSprite.pivot.y + secondSprite.height;
  }else{
    // 有旋转的时候
  }
  // console.log(mainSprite.rotation)
  if( 
    // secondMinX secondMinY
    ( NumberBetween(secondMinX, mainMinX, mainMaxX) && NumberBetween(secondMinY, mainMinY, mainMaxY) ) ||
    // secondMaxX secondMinY
    ( NumberBetween(secondMaxX, mainMinX, mainMaxX) && NumberBetween(secondMinY, mainMinY, mainMaxY) ) ||
    // secondMinX secondMaxY
    ( NumberBetween(secondMinX, mainMinX, mainMaxX) && NumberBetween(secondMaxY, mainMinY, mainMaxY) ) ||
    // secondMaxX secondMaxY
    ( NumberBetween(secondMaxX, mainMinX, mainMaxX) && NumberBetween(secondMaxY, mainMinY, mainMaxY) ) ||

    // mainMinX mainMinY
    ( NumberBetween(mainMinX, secondMinX, secondMaxX) && NumberBetween(mainMinY, secondMinY, secondMaxY) ) ||
    // mainMaxX mainMinY
    ( NumberBetween(mainMaxX, secondMinX, secondMaxX) && NumberBetween(mainMinY, secondMinY, secondMaxY) ) ||
    // mainMinX mainMaxY
    ( NumberBetween(mainMinX, secondMinX, secondMaxX) && NumberBetween(mainMaxY, secondMinY, secondMaxY) ) ||
    // mainMaxX mainMaxY
    ( NumberBetween(mainMaxX, secondMinX, secondMaxX) && NumberBetween(mainMaxY, secondMinY, secondMaxY) ) 
  ){
    return true
  }else{
    return false
  }
}
function hitPreciselyTest(mainSprite, secondSprite){
  // 使用这个像素检测在iphone5s上有点卡顿的感觉
  // let mainX = mainSprite.x - mainSprite.width * .5;
  // let mainY = mainSprite.y - mainSprite.height * .5;
  // let secondX = secondSprite.x - secondSprite.width * .5;
  // let secondY = secondSprite.y - secondSprite.height * .5;

  // let hitAreaX, hitAreaY, hitAreaW, hitAreaH;
  // hitAreaX = Math.min(mainX, secondX);
  // hitAreaY = Math.min(mainY, secondY);
  // hitAreaW = mainSprite.width + secondSprite.width;
  // hitAreaH = mainSprite.height + secondSprite.height;

  // let cvs = document.createElement("canvas");
  // cvs.width = hitAreaW;
  // cvs.height = hitAreaH;
  // let ctx = cvs.getContext("2d");
  // ctx.globalCompositeOperation="destination-in";

  // ctx.drawImage(mainSprite._texture.baseTexture.source, mainSprite.x - hitAreaX, mainSprite.y - hitAreaY);
  // ctx.drawImage(secondSprite._texture.baseTexture.source, secondSprite.x - hitAreaX, secondSprite.y - hitAreaY);

  // let ImageData = ctx.getImageData(0, 0, hitAreaW, hitAreaH).data;
  
  // for (let index = 0, len = ImageData.length; index < len; index+= 4) {
  //   const opacity = ImageData[index + 3];
  //   if(opacity !== 0){
  //     return false;
  //   }
  // }
  return true;
}
function NumberBetween(testNumber, minNumber, MaxNumber) {
  if(testNumber >= minNumber && testNumber <= MaxNumber){
    return true;
  }else{
    return false;
  }
}




