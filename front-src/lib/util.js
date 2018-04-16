/**
 * 检测手机号码是否合法
 * 
 * @export
 * @param {any} phone 
 * @returns 
 */
export function CheckPhone(phone){
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
export function ComputeCharLength(str){
  let len = str.length;
  let re;
  re = /[\u4e00-\u9fa5]/g; // 中文检测
  if(re.test(str)){
    len += str.match(re).length;
  }
  re = /[\uff00-\uffff]/g; // 中文字符，如逗号、句号
  if(re.test(str)){
    len += str.match(re).length;
  }
  return len;
}