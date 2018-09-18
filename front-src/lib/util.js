import qs from "qs";
/**
 * 检测手机号码是否合法
 * 
 * @export
 * @param {any} phone 
 * @returns 
 */
export function CheckPhone(phone) {
  phone = phone.toString();
  return /^1[0-9]{10}$/.test(phone)
}
/**
 * 计算字符长度
 * 全角算2，半角算1
 * 
 * @param {string} str 
 * @returns 
 */
export function ComputeCharLength(str) {
  let len = str.length;
  let re;
  re = /[\u4e00-\u9fa5]/g; // 中文检测
  if (re.test(str)) {
    len += str.match(re).length;
  }
  re = /[\uff00-\uffff]/g; // 中文字符，如逗号、句号
  if (re.test(str)) {
    len += str.match(re).length;
  }
  return len;
}

export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
export function UpdateQueryString(data){
  var searchData = qs.parse(window.location.search.slice(1))
  searchData = {
    ...searchData,
    ...data,
  }
  return qs.stringify(searchData)
}
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) return decodeURIComponent(arr[2]);
  return null;
}
export function getEventId(code) {
  return ('' + code).substring(0, 4) + Date.now();
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|ucweb|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent);
}

export function getIosVersion(callBack) {
  var str = navigator.userAgent.toLowerCase();
  var ver = str.match(/cpu iphone os (.*?) like mac os/);
  if (ver) {
    ver = ver[1].replace(/_/g, ".")
    callBack(ver, ver.split("."))
    return ver;
  }
}
export function isAndroid(){
  var u = navigator.userAgent;
  if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
      return true;
  }
}
export function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}