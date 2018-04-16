import * as PIXI from "pixi.js";
import { assetMap } from '../../assets/assetUtil';
import * as _ from 'lodash';

export class Player{
  constructor(stage){
    this._playerSpriteList = [];
    this.init(stage)
  }
  init(stage){
    this._godModeDuration = 10 * 1000;
    this._isGod = false;
    this._isDrag = false;
    let base, texture, sprite, name, area;

    name = "god";
    base = new PIXI.BaseTexture(assetMap.getDom(`player-${name}`));
    texture = new PIXI.Texture(base);
    sprite = new PIXI.Sprite(texture);
    sprite.pivot.x = sprite.width * .5;
    sprite.pivot.y = sprite.height * .5;
    sprite.visible = false;
    sprite.interactive = false;
    sprite.on("touchstart", (event) => { this.touchstart(event) })
    sprite.on("touchmove", (event) => { this.touchmove(event) })
    sprite.on("touchend", (event) => { this.touchend(event) })
    stage.addChild(sprite);
    this._playerSpriteList = [...this._playerSpriteList, {name, sprite, area}];

    name = "fai";
    base = new PIXI.BaseTexture(assetMap.getDom(`player-${name}`));
    texture = new PIXI.Texture(base);
    sprite = new PIXI.Sprite(texture);
    sprite.pivot.x = sprite.width * .5;
    sprite.pivot.y = sprite.height * .5;
    sprite.visible = false;
    sprite.interactive = false;
    sprite.on("touchstart", (event) => { this.touchstart(event) })
    sprite.on("touchmove", (event) => { this.touchmove(event) })
    sprite.on("touchend", (event) => { this.touchend(event) })
    stage.addChild(sprite);
    this._playerSpriteList = [...this._playerSpriteList, {name, sprite}];

    name = "nor";
    base = new PIXI.BaseTexture(assetMap.getDom(`player-${name}`));
    texture = new PIXI.Texture(base);
    sprite = new PIXI.Sprite(texture);
    sprite.pivot.x = sprite.width * .5;
    sprite.pivot.y = sprite.height * .5;
    sprite.visible = false;
    sprite.interactive = false;
    sprite.on("touchstart", (event) => { this.touchstart(event) })
    sprite.on("touchmove", (event) => { this.touchmove(event) })
    sprite.on("touchend", (event) => { this.touchend(event) })
    stage.addChild(sprite);
    this._playerSpriteList = [...this._playerSpriteList, {name, sprite}];

    this.setPosition(0, 0);
    this.changeState(name);
  }
  onGesture(){
    this._playerSpriteList.forEach(sprite => {
      sprite.sprite.interactive = true;
    })
  }
  offGesture(){
   this._playerSpriteList.forEach(sprite => {
      sprite.sprite.interactive = false;
    })
  }
  openGodMode(){
    this._isGod = true;
    this.changeState("god");
  }
  closeGodMode(){
    this._isGod = false;
    this.changeState("nor");
  }
  isGod(){
    return this._isGod;
  }
  /**
   * 设置玩家的位置
   * 
   * @param {number} x 
   * @param {number} y 
   * @memberof Player
   */
  setPosition(x, y){
    this._playerSpriteList.forEach(playerSprite => {
      if(playerSprite.name == "nor"){
        playerSprite.sprite.x = x;
        playerSprite.sprite.y = y;
      }else if(playerSprite.name == "fai"){
        playerSprite.sprite.x = x - 20;
        playerSprite.sprite.y = y - 10;
      }else if(playerSprite.name == "god"){
        playerSprite.sprite.x = x - 20;
        playerSprite.sprite.y = y + 5;
      }else{
        playerSprite.sprite.x = x;
        playerSprite.sprite.y = y;
      }
    });
  }
  /**
   * 改变玩家显示状态
   * 
   * @param {any} state 
   * @memberof Player
   */
  changeState(state){
    _.forEach(this._playerSpriteList, sprite => {
      sprite.sprite.visible = false
    });
    let playerSprite = _.find(this._playerSpriteList, sprite => sprite.name === state);
    if(playerSprite){
      playerSprite.sprite.visible = true;
      this.width = playerSprite.sprite.width;
      this.height = playerSprite.sprite.height;
      this._name = playerSprite.name;
      this._sprite = playerSprite.sprite;
    }
  }
  touchstart(event){
    this._isDrag = true;
  }
  touchmove(event){
    if(this._isDrag === true){
      this.setPosition(event.data.global.x, event.data.global.y);
    }
  }
  touchend(){
    this._isDrag = false;
  }
}