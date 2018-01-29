import * as _ from 'lodash';
import { DomAPI } from '../lib/DomAPI';

interface AssetResources{
  name: string;
  url: string;
  loadCompleted: boolean;
}
class AssetMap{
  assetList: AssetResources[] = [{
    name: 'search',
    url: require('../_asset/weixin-search.png'),
    loadCompleted: false
  }, {
    name: 'chatsActive',
    url: require('../_asset/chats-active.png'),
    loadCompleted: false
  }, {
    name: 'contactsActive',
    url: require('../_asset/contacts-active.png'),
    loadCompleted: false
  }, {
    name: 'discoverActive',
    url: require('../_asset/discover-active.png'),
    loadCompleted: false
  }, {
    name: 'meActive',
    url: require('../_asset/me-active.png'),
    loadCompleted: false
  }, {
    name: 'poster',
    url: require('../_asset/poster.jpg'),
    loadCompleted: false
  }, {
    name: 'clickPromptIcon',
    url: require('../_asset/poster-bottom.png'),
    loadCompleted: false
  }, {
    name: 'wechatIcon',
    url: require('../_asset/wechat.png'),
    loadCompleted: false
  }, {
    name: 'input-area',
    url: require('../_asset/input-area.jpg'),
    loadCompleted: false
  }, {
    name: 'input-method-button-none',
    url: require('../_asset/input-method.jpg'),
    loadCompleted: false
  }, {
    name: 'input-method-button-have',
    url: require('../_asset/input-method-have.jpg'),
    loadCompleted: false
  } ];
  constructor(){
    _.forEach(this.assetList, (asset) =>{
      DomAPI.render(`<img src="${asset.url}">`).on('load', (ev) => {
        try{
          asset.loadCompleted = true;
          (<any>this)[asset.name] = HostImageToLocationImage(<HTMLImageElement>ev.currentTarget);
          this.completeCheck();
        }catch(e){
          console.error('AssetMap assignment error');
        }
      })
    })
  }
  get(assetName: string): string{
    const assetObj = _.find(this.assetList, asset => asset.name == assetName);
    if(assetObj){
      return assetObj.url;
    }else{
      console.error('asset map has no ' + assetName);
      return '';
    }
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
  _complete = () => {};
  setComplete(complete: () => void){
    this._complete = complete;
  }
  complete(){
    this._complete();
  }
}

export const assetMap = new AssetMap;
(<any>window).assetMap = assetMap;

function HostImageToLocationImage(image: HTMLImageElement): string{
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  if(context){
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL("image/jpeg", 0.1);
    return Base64toURL(base64);
  }else{
    return image.src;
  }
}

function Base64toURL(baseData: string): string{
  let blob = dataURLtoBlob(baseData)
  if(blob){
    return getObjectURL(blob);
  }else{
    return baseData
  }
}
function dataURLtoBlob(dataurl: string): Blob | undefined {
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

function getObjectURL(file: Blob) {
  var url = null;
  if ((<any>window).createObjectURL !== undefined) { // basic
      url = (<any>window).createObjectURL(file);
  } else if (window.URL !== undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
  } else if ((<any>window).webkitURL !== undefined) { // webkit or chrome
      url = (<any>window).webkitURL.createObjectURL(file);
  }
  return url;
}