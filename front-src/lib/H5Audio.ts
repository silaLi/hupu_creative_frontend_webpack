export class GameAudio {
  audio: HTMLAudioElement;
  audioBackUp: HTMLAudioElement;
  isPreload = false;
  playNum = 0;
  constructor(src: string) {
    this.audioBackUp = new Audio();
    this.audioBackUp.controls = true;

    this.audio = new Audio();
    this.audio.controls = true;
    
    this.setSrc(src);
    this.audio.onplay = () =>{
      this.isPreload = true;
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
    }, 100);
  }
  setSrc(src: string){
    this.audio.src = src;
    this.audioBackUp.src = src;
  }
  play(){
    this.playNum++;
    if (this.playNum % 2 == 0){
      this.audio.currentTime = 0;
      this.audio.play();
    }else{
      this.audioBackUp.currentTime = 0;
      this.audioBackUp.play();
    }
  }
  pause(){
    this.audio.pause();
    this.audioBackUp.pause();
  }
}
class MultipleGameAudio {
  src: string;
  audioList: Array<HTMLAudioElement> = [];
  constructor(src: string) {
    this.src = src;
    for(let i = 0; i < 3; i++){
      let audio = new Audio();
      audio.src = this.src;
      audio.preload = 'auto';
      audio.volume = 0;
      this.audioList.push(audio);
    }
    this.preload();
  }
  preload(){
    this.audioList.forEach(audio => {
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 100);
    })
  }
  play(){
    let audio = this.audioList.pop();
    if(audio){
      audio.play();
      audio.currentTime = 0;
      this.audioList.unshift(audio);
    }
  }
}