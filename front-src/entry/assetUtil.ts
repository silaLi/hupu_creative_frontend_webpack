import * as _ from 'lodash';
import { DomAPI } from '../lib/DomAPI';

class AssetResources{
  name: string;
  url: string;
  orUrl?: string;
  loadCompleted: boolean = false;
}
class AssetMap{
  assetList: AssetResources[] = [{
    name: 'chatsActive',
    url: require('../_asset/chats-active.png'),
    loadCompleted: false
  }];
  constructor(){
    
  }
  preLoad(){
    _.forEach(this.assetList, (asset) =>{
      // 已经加载完成了，或者不需要预加载
      if(asset.loadCompleted == true){
        return
      }
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