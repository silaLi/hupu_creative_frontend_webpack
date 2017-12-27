import './page-1.scss'

import { DomAPI } from "../../lib/DomAPI-0.0.4";
import { assetMap } from "../assetUtil";
import { routes } from '../router';
import { Page } from '../../lib/Page-0.1.1';

let HTML: string = require('./page-1.html');

export class Page1 extends Page {
  constructor() {
    super();
  }
  initPageElem(): void{
    this.DOMAPI = DomAPI.CreateByHtmlString(HTML);
    this.pDOMAPI.append(this.DOMAPI.getElemList());
  }
  initPageEvent(): void{
    this.DOMAPI.find('.action-enter-next').on('click', () => {
      routes.go('page2');
    })
  }
  setBackground():void{
    let background = DomAPI.CreateByHtmlString(`<img class="bg" src='${require("../../_asset/20130605100532641.jpg")}'>`);
    this.DOMAPI.appendBefore(background.getElemList());
  }
}