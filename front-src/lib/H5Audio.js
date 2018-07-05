/**
 * 多个音频
 * 有的音频播放间隔很短，第二次播放的时候可能会在第一次播放的声音还没播放完成的时候播放，导致第一次播放的声音还没播放完成就截断了
 * 
 * @export
 * @class GameAudio
 */
export class GameAudio {
/**
 * audio.src
 * @param {string} src 
 */
  constructor(src) {
    // 单位秒
    this.preloadTime = 1;
    this.isPreload = false;
    this.playNum = 0;
    this.audioBackUp = new Audio();
    this.audioBackUp.controls = true;

    this.audio = new Audio();
    this.audio.controls = true;
    this.SilentMode = false;

    this.setSrc(src);
    // 播放一次后，说明已经缓存好了
    this.audio.onplay = () =>{
      this.isPreload = true;
    }
    this.audioBackUp.onplay = () =>{
      this.isPreload = true;
    }
    
    this.audio.onended = () => {
      this.ended();
    }
    this.audioBackUp.onended = () => {
      this.ended();
    }
  }
  preload(){
    if(this.isPreload){
      // 已经缓存过了
      return;
    }
    this.audio.play();
    this.audioBackUp.play();
    setTimeout(() => {
      try {
        this.pause();
      }catch(e) {
        console.error('audio preload error');
      }
    }, this.preloadTime * 1000);
  }
  setSrc(src){
    this.audio.src = src;
    this.audioBackUp.src = src;
  }
  play(){
    if(this.SilentMode){
      // 静音模式
      return;
    }
    this.playNum++;
    if (this.playNum % 2 == 0){
      this.audio.currentTime = this.preloadTime;
      this.audio.play();
    }else{
      this.audioBackUp.currentTime = this.preloadTime;
      this.audioBackUp.play();
    }
  }
  replay(){
    if(this.SilentMode){
      // 静音模式
      return;
    }
    this.playNum++;
    if (this.playNum % 2 == 0){
      if(this.audio.currentTime < this.preloadTime){
        this.audio.currentTime = this.preloadTime;
      }
      this.audio.play();
    }else{
      if(this.audioBackUp.currentTime < this.preloadTime){
        this.audioBackUp.currentTime = this.preloadTime;
      }
      this.audioBackUp.play();
    }
  }
  pause(){
    this.audio.pause();
    this.audioBackUp.pause();
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
/**
 * 单个音频
 * 
 * @export
 * @class SingleAudio
 */
export class SingleAudio{
  constructor(src){
    this.preloadTime = 1;
    this.isPreload = false;
    this.playNum = 0;
    this.audio = new Audio();
    this.audio.controls = true;
    this.SilentMode = false;

    this.setSrc(src);
    // 播放一次后，说明已经缓存好了
    this.audio.onplay = () =>{
      this.isPreload = true;
    }
    
    this.audio.onended = () => {
      this.ended();
    }
  }
  preload(){
    if(this.isPreload){
      // 已经缓存过了
      return;
    }
    this.audio.play();
    setTimeout(() => {
      try {
        this.pause();
      }catch(e) {
        console.error('audio preload error');
      }
    }, this.preloadTime * 1000);
  }
  setSrc(src){
    this.audio.src = src;
  }
  play(){
    if(this.SilentMode){
      // 静音模式
      return;
    }
    this.audio.currentTime = this.preloadTime;
    this.audio.play();
  }
  replay(){
    if(this.SilentMode){
      // 静音模式
      return;
    }
    if(this.audio.currentTime < this.preloadTime){
      this.audio.currentTime = this.preloadTime;
    }
    this.audio.play();
  }
  pause(){
    this.audio.pause();
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