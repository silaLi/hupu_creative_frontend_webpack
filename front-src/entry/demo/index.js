import './index.scss'
import $ from "zepto";
import * as _ from 'lodash';
import FastClick from "fastclick";

import { Page } from '../../lib/Page.js';
let HTML = require('./index.html');

export class Demo extends Page {
  initPageElem(){
    this.DOM = $(HTML);

    this.openMinScreenHeight();
  }
  initPageEvent(){

  }
  pageElemAppend(){
    this.PDOM = $('#app');
    this.PDOM.append(this.DOM);
  }
  showbefore(){
    this.modeChange('fixed');
  }
  showFirstBefore(){
    
  }
}