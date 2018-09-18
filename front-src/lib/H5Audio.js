/**
 * 多个音频
 * 有的音频播放间隔很短，第二次播放的时候可能会在第一次播放的声音还没播放完成的时候播放，导致第一次播放的声音还没播放完成就截断了
 * 
 * @export
 * @class GameAudio
 */
import * as _ from "lodash";
export class GameAudio {
/**
 * audio.src
 * @param {string} src 
 */
  constructor(src, num) {
    // 单位秒
    this.preloadTime = .05;
    this.isPreload = false;

    this.audio = _.map(new Array(num || 10), () => {
      return new Audio();
    });
    
    this.setAttr("controls", true);
    this.SilentMode = false;

    this.setSrc(src);
    
    this.initEvent();
  }
  setAttr(attr, val){
    _.forEach(this.audio, audio => {
      audio[attr] = val;
    })
  }
  setLoop(loop){
    this.setAttr("loop", loop);
  }
  initEvent(){
    // 播放一次后，说明已经缓存好了
    _.forEach(this.audio, audio => {
      audio.onplay = () =>{
        this.isPreload = true;
      }
      audio.onended = () => {
        this.ended();
      }
    })
  }
  getAudio(){
    return _.find(this.audio, audio => audio.paused);
  }
  preload(){
    if(this.isPreload){
      // 已经缓存过了
      return;
    }
    _.forEach(this.audio, audio=> audio.play())
    setTimeout(() => {
      try {
        this.pause();
      }catch(e) {
        console.error('audio preload error');
      }
    }, this.preloadTime * 1000);
  }
  setSrc(src){
    _.forEach(this.audio, audio => {
      audio.src = src;
    })
  }
  play(){
    if(this.SilentMode){
      // 静音模式
      return;
    }
    var audio = this.getAudio();
    if(audio){
      audio.currentTime = 0;
      audio.play();
    }
  }
  replay(){
    if(this.SilentMode){
      // 静音模式
      return;
    }
    var audio = this.getAudio();
    if(audio){
      audio.currentTime = 0;
      audio.play();
    }
  }
  pause(){
    _.forEach(this.audio, audio => audio.pause())
  }
  ended(){
    this.onEnd();
  }
  /**
   * 这个函数可以自定义的
   * 用于监听播放完成后的事件
   * 
   * @memberof GameAudio
   */
  onEnd(){}
}
