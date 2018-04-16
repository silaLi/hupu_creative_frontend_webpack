export const version = '0.0.1';
import './Page.scss';
import { DomAPI } from './DomAPI';
import { prefixerCssObj } from './prefixerCss';
import { startPageTransformSize, stopPageTransformSize } from '../entry/windowResize';


export const pageContainer = DomAPI.render(`
<div class="page-set">
  <div class="page-set-transform"></div>
</div>
`)
pageContainer.appendTo('body');
export const pageContainerTransform = pageContainer.find('.page-set-transform');

export abstract class Page {
  static version = version;
  DOMAPI: DomAPI;
  pDOMAPI: DomAPI = pageContainerTransform;
  _display = false;
  _animating = false;
  constructor() {
    this.initPageElem();
    this.initPageEvent();
    this.setBackground();
    this.modeChange('fixed');
    this.pageElemAppend();
  }
  show(): void {
    if(!this._display){
      this.showbefore();
      this.DOMAPI.css({ display: 'block' })
      this._display = true;
      this.showafter();
    }
  }
  hide(): void {
    if(this._display){
      this.hidebefore();
      this.DOMAPI.css({ display: 'none' })
      this._display = false;
      this.hideafter();
    }
  }
  showbefore(): void{}
  hidebefore(): void{}
  showafter(): void{}
  hideafter(): void{}

  reayShow(): void{};
  reayHide(): void{};
  abstract initPageElem(): void;
  abstract initPageEvent(): void;
  abstract setBackground(): void;
  abstract pageElemAppend(): void;
  
  showByAnimate(animateClassName: string, animateHandler?: () => void){
    if(!this._animating && !this._display){
      this.showbefore();
      this.showAnimateBefore();
      this.DOMAPI.css({ display: 'block' })
      this.DOMAPI.addClass(animateClassName);
      this._animating = true;
      let showAnimateEnd = () => {
        this.DOMAPI.off('animationend webkitAnimationEnd oAnimationEnd', showAnimateEnd);
        this.DOMAPI.removeClass(animateClassName);
        this._display = true;
        animateHandler && animateHandler();
        this.showAnimateAfter();
        this.showafter();
      };
      this.DOMAPI.on('animationend webkitAnimationEnd oAnimationEnd', showAnimateEnd);
    }
  }
  hideByAnimate(animateClassName: string, animateHandler?: () => void): void {
    if(!this._animating && this._display){
      this.hidebefore();
      this.hideAnimateBefore();
      this.DOMAPI.addClass(animateClassName);
      this._animating = true;
      let showAnimateEnd = () => {
        this.DOMAPI.off('animationend webkitAnimationEnd oAnimationEnd', showAnimateEnd);
        this.DOMAPI.removeClass(animateClassName);
        this._display = false;
        this.DOMAPI.css({ display: 'none' })
        animateHandler && animateHandler();
        this.hideAnimateAfter();
        this.hideafter();
      };
      this.DOMAPI.on('animationend webkitAnimationEnd oAnimationEnd', showAnimateEnd);
    }
  }
  // steam: 流动布局
  // fixed: 固定高度
  // percent: 百分之百高度
  modeChange(mode: 'steam' | 'fixed' | 'percent'){
    switch(mode){
      case 'steam':
      startPageTransformSize();
      break;
      case 'fixed':
      stopPageTransformSize();
      break;
      case 'percent':
      stopPageTransformSize();
      break;
    }
    const html = new DomAPI('html')
    html.removeClass('steam fixed percent')
    html.addClass(mode);
  }
  showAnimateBefore(): void{}
  showAnimateAfter(): void{}
  hideAnimateBefore(): void{}
  hideAnimateAfter(): void{}
}