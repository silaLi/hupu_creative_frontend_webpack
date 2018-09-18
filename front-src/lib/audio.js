import { GameAudio } from "./H5Audio";
import { music } from "../components/music";

export const sentMessage = new GameAudio(require('../static/audio/sent-message.mp3'));


// 预加载音频接口
export function preloadAudio(){
  // sentMessage.preload();
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