import './index.scss'
import { DomAPI } from '../../lib/DomAPI';
import { Animation } from '../../lib/Animation';
const HTML = require('./index.html');

class ErrorAlert {
  DOMAPI: DomAPI;
  DOMAPIBaseClassName: string;
  MsgTxt: DomAPI;
  _autoCloseTimer: any;
  constructor() {
    this.DOMAPI = DomAPI.render(HTML);
    this.MsgTxt = this.DOMAPI.find('.msg-txt');
    this.DOMAPI.appendTo('body');
    this.DOMAPIBaseClassName = this.DOMAPI.getEl(0).className;
  }
  show(msg: string){
    this.MsgTxt.text(msg);
    this.DOMAPI.setClass(this.DOMAPIBaseClassName, 'red')
    new Animation(this.DOMAPI.getEl(0), 'op-show').run( () => {
      this.DOMAPI.setClass(this.DOMAPIBaseClassName, 'red', 'show');
      this.autoClose();
    })
  }
  autoClose(){
    clearTimeout(this._autoCloseTimer);
    this._autoCloseTimer = setTimeout( () => {
      this.DOMAPI.setClass(this.DOMAPIBaseClassName);
      new Animation(this.DOMAPI.getEl(0), 'op-hide').run( () => {
        this.DOMAPI.setClass(this.DOMAPIBaseClassName);
      })
    }, 3000);
  }
  showSuccess(msg: string){
    this.MsgTxt.text(msg);
    this.DOMAPI.setClass(this.DOMAPIBaseClassName + ' green')
    new Animation(this.DOMAPI.getEl(0), 'op-show').run( () => {
      this.DOMAPI.setClass(this.DOMAPIBaseClassName, 'green', 'show');
      this.autoClose();
    })
  }
}

export const errorAlert = new ErrorAlert;