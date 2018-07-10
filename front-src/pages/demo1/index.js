import style from './index.less'
let HTML = require('./index.html');
import $ from "jquery";
import * as _ from 'lodash';
import { thorough } from "../../lib/css-module-aisle";

export class Demo{
  /**
   * only Assignment
   */
  constructor(){
    this.data = {}
    this.__HTML = HTML;
    this.__style = style;
  }
  /**
   * start class life cycle
   */
  init(){
    this.initData();
    this.initDataComplete();
    this.initPage();
    this.initPageComplete();
    this.render();
    this.renderComplete();
    this.initEvent();
    this.initEventComplete();
  }
  initData(){
    this.__renderHTML = thorough(this.__HTML, this.__style)
  }
  initDataComplete(){

  }
  initPage(){
    this.DOM = $(this.__renderHTML);
  }
  initPageComplete(){
    
  }
  render(){
    this.PDOM = $('#app');
    this.PDOM.append(this.DOM);
  }
  renderComplete(){
    
  }
  initEvent(){

  }
  initEventComplete(){

  }
}