import './index.scss'
import $ from "zepto";
import FastClick from "fastclick";
import { assetMap } from '../../assets/assetUtil';
import { backMusicAudio } from '../../assets/audio';
import { APP } from '../app';
let HTML = require('./index.html');

export class Music{
  constructor(){
    this.state = "pause"
    this.DOM = $(HTML);
    
    this.setImage();
    this.setEvent();
    // 播放结束后
    backMusicAudio.onEnd = () => {
      this.play();
    }
  }
  setImage(){
    this.DOM.find(".sounds-0").attr("src", assetMap.get("sounds-0"))
    this.DOM.find(".sounds-1").attr("src", assetMap.get("sounds-1"))
    this.DOM.find(".sounds-2").attr("src", assetMap.get("sounds-2"))
  }
  setEvent(){
    FastClick.attach(this.DOM[0]);
    this.DOM.on("click", () => {
      this.taggle()
    })
  }
  appendTo(container){
    container.append(this.DOM[0]);
  }
  play(){
    APP.SilentMode = false;
    this.state = "play";
    this.DOM.addClass("playing")
    backMusicAudio.replay();
  }
  pause(){
    APP.SilentMode = true;
    this.state = "pause";
    this.DOM.removeClass("playing")
    backMusicAudio.pause();
  }
  taggle(){
    if(this.state == "pause"){
      this.play();
    }else if(this.state == "play"){
      this.pause();
    }else{
      this.state = "pause"
    }
  }
}

export const music = new Music;