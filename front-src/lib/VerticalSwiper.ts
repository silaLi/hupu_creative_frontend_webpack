import { DomAPI } from "./DomAPI";
import { prefixerCssArr } from "./prefixerCss";

// import _$$ from './DomAPI-0.0.2.js';
// import AutoprefixerCssStyle from './AutoprefixerCssStyle-0.0.1.js';
interface VerticalSwiperOption {
  swiper: HTMLElement;
  wrapper: HTMLElement;
  trackY?: HTMLElement;
  trainY?: HTMLElement;
}
export class VerticalSwiper {
  clientHeight: number;
  scrollTop: number;
  scrollHeight: number;
  touchstartTime: number;
  touchstartPosition = {};
  touchmoveClientY: number;
  touchmoveTimeStamp: number;
  touchmoveLastMove: number;
  domElem: HTMLElement;
  EventHandleElem: HTMLElement;

  trackY?: HTMLElement;
  trainY?: HTMLElement;
  trackYLenght: number;
  trainYLenght: number;

  constructor(option: VerticalSwiperOption) {
    let opt = option

    this.clientHeight = 0;
    this.scrollTop = 0;

    this.clientHeight = this.getElemHeight(opt.swiper);
    this.scrollHeight = this.getElemHeight(opt.wrapper);

    this.EventHandleElem = opt.swiper;
    this.domElem = opt.wrapper;
    this.scrollTop = 0;
    this.touchstartTime = 0;
    this.touchstartPosition = {};
    this.touchmoveClientY = 0;
    this.touchmoveTimeStamp = 0;
    this.touchmoveLastMove = 0;

    this.domElem.style.cssText = '';

    if (opt.trackY && opt.trainY) {
      this.trackY = opt.trackY;
      this.trainY = opt.trainY;

      this.trackYLenght = this.getElemHeight(opt.trackY);
      this.trainYLenght = this.clientHeight / this.scrollHeight * this.trackYLenght;

      DomAPI.render(this.trainY).css({ height: this.trainYLenght + 'px', top: 0 })
    }


    this.Event();
  }
  setScrollTop(time = 0) {

    DomAPI.render(this.domElem).cssArray(prefixerCssArr('transform', 'translateZ(0) translate(0, ' + (-this.scrollTop) + 'px)').concat(prefixerCssArr('transition', 'transform ' + time + 's')));

    this.updateTrain(time);
  }
  Event() {

    DomAPI.render(this.EventHandleElem).on('touchstart', e => {
      this.touchmoveClientY = JSON.parse(this.getTouchPostion(<TouchEvent>e)).clientY;
      this.touchmoveTimeStamp = e.timeStamp;
      this.touchstartTime = e.timeStamp;
      this.touchstartPosition = this.getTouchPostion(<TouchEvent>e);

      this.setScrollTop();

      e.preventDefault();
      e.stopPropagation();
    })
    DomAPI.render(this.EventHandleElem).on('touchend', e => {
      this.touchmoveClientY = 0;
      this.touchstartPosition = {};
      this.touchstartTime = 0;

      var interval = e.timeStamp - this.touchmoveTimeStamp;
      interval = 400 / interval;
      var lastMove = Math.min(this.touchmoveLastMove * interval * .5, this.clientHeight * .5);
      this.scrollTop += lastMove;
      console.log(this.scrollTop)
      if (this.scrollTop < 0) {
        this.scrollTop = 0
      } else if (this.scrollTop > this.scrollHeight - this.clientHeight) {
        this.scrollTop = this.scrollHeight - this.clientHeight
      }
      console.log(this.scrollTop);
      // this.domElem.cssArray(AutoprefixerCssStyle.array('transform', 'translateZ(0) translate(0, '+(-this.scrollTop)+'px)').concat(AutoprefixerCssStyle.array('transition', 'transform .5s')));
      this.setScrollTop(.5)

      e.preventDefault();
      e.stopPropagation();
    });
    DomAPI.render(this.EventHandleElem).on('touchmove', e => {
      var timeStamp = e.timeStamp;
      this.touchmoveTimeStamp = timeStamp;

      var clientY = JSON.parse(this.getTouchPostion(<TouchEvent>e)).clientY;
      var move = this.touchmoveClientY - clientY;
      if (Math.abs(move) < 5) {
        console.log('not small')
        e.preventDefault();
        e.stopPropagation();
      }
      this.touchmoveClientY = clientY;
      this.touchmoveLastMove = move;
      if (this.scrollTop + move > 0 && this.scrollTop + move < this.scrollHeight - this.clientHeight) {
        this.scrollTop += move;
      } else {
        this.scrollTop += move * .5;
      }
      this.setScrollTop();

      e.preventDefault();
      e.stopPropagation();
    });


  }
  getTouchPostion(e: TouchEvent) {
    var touchstartPosition = {};
    var touch;
    try {
      touch = e.changedTouches[0] || e.targetTouches[0];
    } catch (e) {
      touch = { clientX: undefined, clientY: undefined };
    }
    touchstartPosition = {
      clientX: touch.clientX,
      clientY: touch.clientY
    }
    return JSON.stringify(touchstartPosition);
  }
  getElemHeight (elem: HTMLElement) {
    elem.style.cssText = 'visibility: hidden;display: block';

    try {
      var height = elem.clientHeight;
    } catch (e) {
      var height = 0;
    }

    elem.style.cssText = '';
    return height;
  }
  updateTrain (time: number) {
    if (this.trackY && this.trainY ) {
      var trainMaxTop = this.trackYLenght - this.trainYLenght;
      var contentMaxTop = this.scrollHeight - this.clientHeight;
      DomAPI.render(this.trainY).cssArray(prefixerCssArr('transition', 'top '+time+'s').concat([{top: this.scrollTop / contentMaxTop * trainMaxTop + 'px'}]));
    }
  }
}