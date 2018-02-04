export const version = '0.0.2';
import './Page.scss';
import { DomAPI } from './DomAPI';

export abstract class Page {
  static version = version;
  DOMAPI: DomAPI;
  pDOMAPI: DomAPI;
  _display = false;
  _animating = false;
  constructor() {
    this.initPageElem();
    this.initPageEvent();
    this.setBackground();
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
  changeMode(mode: 'percent' | 'stream' | '' = ''){
    const HtmlDomAPI = new DomAPI('html');
    HtmlDomAPI.removeClass('percent stream');
    if(mode != ''){
      HtmlDomAPI.addClass(mode);
    }
  }
  showAnimateBefore(): void{}
  showAnimateAfter(): void{}
  hideAnimateBefore(): void{}
  hideAnimateAfter(): void{}
}