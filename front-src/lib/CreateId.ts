export let version = '0.0.1';

var i = 0;
var base_id = new Date().getTime();
/**
 * 创建唯一id
 * 
 * @export
 * @returns 
 */
export function CreatId() {
  i++;
  return 'creatid__id__' + base_id + i;
}