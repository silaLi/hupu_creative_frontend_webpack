import * as _ from 'lodash'
/**
 * 
 * @export
 * @param {string} template 
 * @param {object[]} data 
 * @returns string
 */
export function TemplateRenderArray(template, data){
  let HTML = '';
  data.forEach( (data, index) => {
    let li = template.replace(new RegExp('\\{\\{_index\\}\\}', 'ig'), `${index}`);
    _.forOwn(data, (val, key) => li = li.replace(new RegExp('\\{\\{'+key+'\\}\\}','gi'), val));
    HTML += li;
  })
  return HTML;
}
/**
 * 
 * @export
 * @param {string} template 
 * @param {object} data 
 * @returns string
 */
export function TemplateRenderObj(template, data){
  let li = template;
  _.forOwn(data, (val, key) => li = li.replace(new RegExp('\\{\\{'+key+'\\}\\}','gi'), val));
  return li;
}