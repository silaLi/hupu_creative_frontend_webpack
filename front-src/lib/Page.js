import $ from "jquery";

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
    this._mode = "";
    $(window).on("resize", () => {
      this.resize();
    })
  }
  resize(){
    if(this.DOM && this._mode === "steam"){
      this.DOM.css({
        "min-height": getWindowHeight(),
      })
    } else if(this.DOM && this._mode === "percent"){
      this.DOM.css({
        "height": getWindowHeight(),
      })
    }
  }
  init(options){
    this._options = {
      PDOM: null,
      ...options,
    }
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
      this.DOM.show();
      this.showAnimateBefore();
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
      this.DOM.addClass(animateClassName);
      this.hideAnimateBefore();
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
  showAnimateBefore(){}
  showAnimateAfter(){}
  hideAnimateBefore(){}
  hideAnimateAfter(){}

  setImage(){}
}

function getWindowHeight(){
  var $elem = $("<div style='position: fixed;top: 0;left:0;bottom:0;right:0;opacity:0'></div>").appendTo("body");
  var height = $elem.height();
  $elem.remove();
  return height;
}