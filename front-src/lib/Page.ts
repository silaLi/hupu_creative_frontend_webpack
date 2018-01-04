export let version = '0.0.1';
import './Page.scss';
import { DomAPI } from './DomAPI';

export abstract class Page {
  DOMAPI: DomAPI;
  pDOMAPI: DomAPI = new DomAPI('body');
  _display = false;
  constructor() {
    this.initPageElem();
    this.initPageEvent();
    this.setBackground();
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
  abstract initPageElem(): void;
  abstract initPageEvent(): void;
  abstract setBackground(): void;
}