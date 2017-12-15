import { DomAPI } from "./DomAPI-0.0.4";
import './page.scss'

export abstract class Page {
  DOMAPI: DomAPI;
  pDOMAPI: DomAPI = new DomAPI('body');
  constructor() {
    this.initPageElem();
    this.initPageEvent();
    this.setBackground();
  }
  show(): void {
    this.showbefore();
    this.DOMAPI.css({ display: 'block' })
    this.showafter();
  }
  hide(): void {
    this.hidebefore();
    this.DOMAPI.css({ display: 'none' })
    this.hideafter();
  }
  showbefore(): void{}
  hidebefore(): void{}
  showafter(): void{}
  hideafter(): void{}
  abstract initPageElem(): void;
  abstract initPageEvent(): void;
  abstract setBackground(): void;
}