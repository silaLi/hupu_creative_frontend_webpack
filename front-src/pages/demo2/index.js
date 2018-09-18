import style from './index.less'
let HTML = require('./index.html');
import { thorough } from "../../lib/css-module-aisle";
import $ from "jquery";
import * as _ from 'lodash';
import { Page } from '../../lib/Page.js';

export class Demo extends Page {
  initPageElem(){
    this.DOM = $(thorough(HTML, style));

  }
  pageElemAppend(){
    this.PDOM = $('#app');
    this.PDOM.append(this.DOM);
  }
}