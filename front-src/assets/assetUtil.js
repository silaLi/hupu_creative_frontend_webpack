import * as _ from 'lodash';
import $ from "zepto";

// {
//   name: 'bgCommon',
//   url: require('../static/bg_common.jpg'),
//   loadCompleted: false
// }
export class AssetMap{
  constructor(){
    this.assetList = [];
    this._complete = () => {};
    /** 
      * [process=(precent, completeCount, totalCount) => {}] 
      * 加载进度回调
      * precent 加载百分比
      * completeCount 完成数量
      * totalCount 总数量
      */
    this._process = (precent, completeCount, totalCount) => {}
    /** 表示已经完成加载 */
    this._complete_sign = false;
    /** 表示已经预加载了 */
    this._preLoad_sign = false
  }
  
  /**
   * 开始预加载
   * 
   * @memberof AssetMap
   */
  preLoad(){
    if(this._preLoad_sign === true){
      return ;
    }
    this._preLoad_sign = true;
    const totalCount = _.reduce(this.assetList, (reduceVal, elem) => {if(elem.loadCompleted == false){ return reduceVal + 1 }else{ return reduceVal}}, 0)
    _.forEach(this.assetList, (asset, index) =>{
      // 已经加载完成了，或者不需要预加载
      if(asset.loadCompleted == true){
        return
      }
      $(`<img src="${asset.url}">`).on('load', (ev) => {
        try{
          this.assetList = _.filter(this.assetList, (filterAsset) => asset.name != filterAsset.name);
          this.assetList = [...this.assetList, {
            ...asset,
            loadCompleted: true,            
            completeImage: ev.currentTarget || ev.target,
          }]

          const completeCount =  _.reduce(this.assetList, (reduceVal, elem) => {if(elem.loadCompleted){ return reduceVal + 1 }else{ return reduceVal}}, 0)
          this._process(completeCount / totalCount, completeCount, totalCount)
          
          this.completeCheck();
        }catch(e){
          console.error('AssetMap assignment error', e);
        }
      })
    })
    this.completeCheck();
  }
  setProcess(_process){
    this._process = _process;
  }
  /**
   * 通过名字获取资源地址
   * 
   * @param {any} assetName 
   * @param {any} type = "base64" || "blob" || "url" || "dom" || undefined
   * @returns 
   * @memberof AssetMap
   */
  get(assetName, type){
    const assetObj = _.find(this.assetList, asset => asset.name == assetName);
    if(assetObj){
      if(type == "base64"){
        assetObj.completeBase64Url = ImageToBase64(assetObj.completeImage);
        return assetObj.completeBase64Url;
      }else if(type == "blob"){
        assetObj.completeBlobUrl = HostImageToLocationImage(assetObj.completeImage);
        return assetObj.completeBlobUrl;
      }else if(type == "url"){
        return assetObj.url;
      }else if(type == "dom"){
        return assetObj.completeImage;
      }else{
        return assetObj.completeBase64Url || assetObj.completeBlobUrl || assetObj.url;
      }
    }else{
      console.error('asset map has no ' + assetName);
      return '';
    }
  }
  getBase64(name){
    return this.get(name, "base64")
  }
  getBlob(name){
    return this.get(name, "blob")
  }
  getUrl(name){
    return this.get(name, "url")
  }
  getDom(name){
    return this.get(name, "dom")
  }
  /**
   * 检测是否加载完成
   * 
   * @memberof AssetMap
   */
  completeCheck(){
    const noComplete = _.findIndex(this.assetList, asset => asset.loadCompleted == false);
    if(noComplete == -1){
      this.complete();
    }
  }
  /**
   * 添加需要加载数据
   * 添加至尾部
   * @memberof AssetMap
   */
  push(name, url){
    this.assetList = [...this.assetList, {
      name: name,
      url: url,
      loadCompleted: false,
    }]
  }
  pushComplete(name, url, completeBase64Url, completeBlobUrl, completeImage){
    this.assetList = [...this.assetList, {
      name,
      url,
      completeImage,
      completeBlobUrl,
      completeBase64Url,
      loadCompleted: true,
    }]
  }
  /**
   * 添加需要加载数据
   * 添加至首部
   * @memberof AssetMap
   */
  shift(name, url){
    this.assetList = [{
      name: name,
      url: url,
      loadCompleted: false,
    }, ...this.assetList]
  }
  /**
   * 设置加载完毕事件
   * 
   * @param {any} complete 
   * @memberof AssetMap
   */
  setComplete(complete){
    this._complete = complete;
  }
  /**
   * 完成后提供给this调用
   * 
   * @memberof AssetMap
   */
  complete(){
    this._complete_sign = true;
    setTimeout(() => {
      this._complete();
    })
  }
}
export const assetMap = new AssetMap;



function ImageToBase64(image){
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  if(context){
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL("image/png", 0.1);
    return (base64);
  }else{
    return image.src;
  }
}
function HostImageToLocationImage(image){
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  if(context){
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL("image/png", 0.1);
    return Base64toURL(base64);
  }else{
    return image.src;
  }
}

function Base64toURL(baseData){
  let blob = dataURLtoBlob(baseData)
  if(blob){
    return getObjectURL(blob);
  }else{
    return baseData
  }
}
function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(',');
  let a = arr[0].match(/:(.*?);/);
  if(a != null){
    let mime = a[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}

function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL !== undefined) { // basic
      url = window.createObjectURL(file);
  } else if (window.URL !== undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
  }
  return url;
}


assetMap.push("logo", require("../static/1.png"));
// assetMap.push("bgCommon", require("../static/bg_common.jpg"));
// assetMap.push("intrKv", require("../static/intr-kv.png"));
// assetMap.push("intrNext", require("../static/intr-next.png"));
// assetMap.push("GameEntryKv", require("../static/game-entry-kv.png"));
// assetMap.push("GameEntryNext", require("../static/game-entry-next.png"));
// assetMap.push("gameStopKv", require("../static/game-stop-kv.png"));
// assetMap.push("inviteFriendsKv", require("../static/invite-friends-kv.png"));
// assetMap.push("recordPhoneKv", require("../static/record-phone-kv.png"));

// // assetMap.push("bgGame", require("../static/bg_game.jpg"));
// for (let i = 1; i <= 10; i++) {
//   let index = i;
//   if(i < 10) index = "0" + i;
//   assetMap.push("bg_game-part_"+ i, require(`../static/game/background/bg_game_${index}.jpg`));
// }

// // game 
// assetMap.push("player-god", require("../static/game/player-god.png"));
// assetMap.push("player-fai", require("../static/game/player-fai.png"));
// assetMap.push("player-nor", require("../static/game/player-nor.png"));


// // 加载字体图片
// for (let index = 0; index < 10; index++) {
//   assetMap.push("font-image-"+ index, require(`../static/font-image/${index}.png`));
// }
// assetMap.push("font-image-%", require("../static/font-image/precent.png"))
// // 加载背景图片
// assetMap.push("loadSoccer", require('../static/loading-soccer.png'));

// for (let index = 1; index <= 9; index++) {
//   assetMap.push("game-monster-"+ index, require(`../static/game/soccer-star-${index}.png`));
// }
// assetMap.push("game-soccer", require('../static/game/soccer.png'));
// assetMap.push("game-special", require('../static/game/special.png'));
// // assetMap.push("game-star-1", require('../static/game/star-1.png'));
// // assetMap.push("game-star-2", require('../static/game/star-2.png'));

// assetMap.push("sounds-0", require("../static/sounds-0.png"))
// assetMap.push("sounds-1", require("../static/sounds-1.png"))
// assetMap.push("sounds-2", require("../static/sounds-2.png"))