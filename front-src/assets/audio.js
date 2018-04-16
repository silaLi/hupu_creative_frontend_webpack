
import { GameAudio, SingleAudio } from "../lib/H5Audio";
import { music } from "../entry/music";

// export let backMusicAudio = new SingleAudio(require('../static/audio/back-music.mp3'));
// export let norAudio = new GameAudio(require('../static/audio/nor.mp3'));
// export let specialAudio = new GameAudio(require('../static/audio/special.mp3'));
// export let top5Audio = new GameAudio(require('../static/audio/top5.mp3'));

// 预加载音频接口
export function preloadAudio(){
  // music.play();
  // norAudio.preload();
  // specialAudio.preload();
  // top5Audio.preload();
}

// 微信预加载音乐
if (window.WeixinJSBridge) {
  window.WeixinJSBridge.invoke('getNetworkType', {}, function() {
    preloadAudio()
  }, false);
} else {
  document.addEventListener("WeixinJSBridgeReady", function() {
    window.WeixinJSBridge.invoke('getNetworkType', {}, function() {
        preloadAudio();
      });
  }, false);
}