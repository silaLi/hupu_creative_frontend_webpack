import './index.scss'

import { DomAPI } from "../../lib/DomAPI";
import { assetMap } from "../assetUtil";
import { routes } from '../router';
import { Page } from '../../lib/Page';

let HTML: string = require('./index.html');

export class WeChatCall extends Page {
  constructor() {
    super();
  }
  initPageElem(): void{
    this.DOMAPI = DomAPI.CreateByHtmlString(HTML);
    
  }
  initPageEvent(): void{
    this.DOMAPI.find('.action-enter-next').on('click', () => {
      routes.go('page2');
    })
  }
  setBackground():void{
    let background = DomAPI.CreateByHtmlString(`<img class="bg" v-src=''>`);
    this.DOMAPI.appendBefore(background.getElemList());
  }
  pageElemAppend(){
    this.pDOMAPI = new DomAPI('body');
    this.pDOMAPI.append(this.DOMAPI.getElemList());
  }
}