import "./Page.scss";
import $ from "zepto";
import { RemToPx } from "./rem";

const screenHeight = $(window).height();
const maxScreenHeight = RemToPx(1256);
const minScreenHeight = RemToPx(1006);
/**
 * 1.添加hideFirstBefore, showFirstBefore, hideFirstAfter, showFirstAfter
 * 
 * @export
 * @class Page
 */
export class Page {
  constructor() {
    this.DOM = null;
    this.PDOM = null;
    this._display = false;
    this._animating = false;
  }
  init(){
    this.initPageElem();
    this.initPageEvent();
    this.setBackground();
    this.pageElemAppend();

    return this;
  }
  show() {
    if(!this._display){
      if(this.showCheck() === false){
        // 停止显示
        return 
      }
      this.showFirstBefore();
      this.showFirstBefore = () => {};
      this.showbefore();
      this.DOM.show();
      this._display = true;
      this.showFirstAfter();
      this.showFirstAfter = () => {};
      this.showafter();
    }
  }
  hide() {
    if(this._display){
      if(this.hideCheck() === false){
        // 停止隐藏
        return 
      }
      this.hideFirstBefore();
      this.hideFirstBefore = () => {};
      this.hidebefore();
      this.DOM.hide();
      this._display = false;
      this.hideFirstAfter();
      this.hideFirstAfter = () => {};
      this.hideafter();
    }
  }
  showCheck(){}
  hideCheck(){}

  showFirstBefore(){}
  showFirstAfter(){}
  hideFirstBefore(){}
  hideFirstAfter(){}

  showbefore(){}
  hidebefore(){}
  showafter(){}
  hideafter(){}

  reayShow(){};
  reayHide(){};

  initPageElem(){}
  initPageEvent(){}
  setBackground(){}
  pageElemAppend(){}

  showByAnimate(animateClassName, animateHandler){
    if(!this._animating && !this._display){
      if(this.showCheck() === false){
        // 停止显示
        return 
      }
      this.showFirstBefore();
      this.showFirstBefore = () => {};
      this.showbefore()
      this.showAnimateBefore();
      this.DOM.show();
      this.DOM.addClass(animateClassName);
      this._animating = true;
      let showAnimateEnd = () => {
        this.DOM.off("animationend webkitAnimationEnd oAnimationEnd", showAnimateEnd);
        this.DOM.removeClass(animateClassName);
        this._display = true;
        this._animating = false;
        animateHandler && animateHandler();
        this.showAnimateAfter();
        this.showFirstAfter();
        this.showFirstAfter = () => {};
        this.showafter();
        
      };
      this.DOM.on("animationend webkitAnimationEnd oAnimationEnd", showAnimateEnd);
    }
  }
  hideByAnimate(animateClassName, animateHandler) {
    if(!this._animating && this._display){
      if(this.hideCheck() === false){
        // 停止隐藏
        return 
      }
      this.hideFirstBefore();
      this.hideFirstBefore = () => {};
      this.hidebefore();
      this.hideAnimateBefore();
      this.DOM.addClass(animateClassName);
      this._animating = true;
      let showAnimateEnd = () => {
        this.DOM.off("animationend webkitAnimationEnd oAnimationEnd", showAnimateEnd);
        this.DOM.removeClass(animateClassName);
        this._display = false;
        this._animating = false;
        this.DOM.css({ display: "none" })
        animateHandler && animateHandler();
        this.hideAnimateAfter();
        this.hideFirstAfter();
        this.hideFirstAfter = () => {};
        this.hideafter();
      };
      this.DOM.on("animationend webkitAnimationEnd oAnimationEnd", showAnimateEnd);
    }
  }
  /**
   * mode = 'steam' | 'fixed' | 'percent'
   * 
   * @param {string} [mode] 
   * @memberof Page
   */
  modeChange(mode){
    switch(mode){
      case 'steam':{
        Page.screenHeight = "auto";
        this.__visitHeight = Infinity;
        this.DOM.css({height: Page.screenHeight});
        break;
      }
      case 'fixed':{
        // h5的最大显示区域和最小显示区域
        if(screenHeight > maxScreenHeight){
          Page.screenHeight = maxScreenHeight
        }else if(screenHeight < minScreenHeight){
          Page.screenHeight = minScreenHeight
        }else{
          Page.screenHeight = screenHeight;
        }
        this.__visitHeight = Page.screenHeight;
        this.DOM.css({height: Page.screenHeight});
        break;
      }
      case 'percent':{
        Page.screenHeight = screenHeight;
        this.__visitHeight = Page.screenHeight;
        this.DOM.css({height: Page.screenHeight});
        break;
      }
    }
  }
  showAnimateBefore(){}
  showAnimateAfter(){}
  hideAnimateBefore(){}
  hideAnimateAfter(){}

  setImage(){}
  
  /**
   * 弃用
   * @memberof Page
   */
  openMinScreenHeight(){
    
  }
}

