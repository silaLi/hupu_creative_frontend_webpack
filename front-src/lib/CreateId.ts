export const version = '0.0.1';

let i = 0;
let base_id = new Date().getTime();
/**
 * 创建唯一id
 * 
 * @export
 * @returns 
 */
// export function CreateId() {
//   i++;
//   return 'creatid__id__' + base_id + i;
// }
export function CreateId(){
  i++;
  return 'creatid__id__' + base_id + '' + i;
}