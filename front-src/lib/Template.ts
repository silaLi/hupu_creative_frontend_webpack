import * as _ from 'lodash'
import { assetMap } from '../entry/assetUtil';
export function TemplateRenderArray(template: string, data: any[]): string{
  let HTML = '';
  data.forEach( (data, index) => {
    let li = template.replace(new RegExp('\\{\\{_index\\}\\}', 'ig'), `${index}`);
    _.forOwn(data, (val, key) => li = li.replace(new RegExp('\\{\\{'+key+'\\}\\}','gi'), val));
    HTML += li;
  })
  HTML = filterEmoji(HTML)
  return HTML;
}

export function TemplateRenderObj(template: string, data: any): string{
  let li = template;
  _.forOwn(data, (val, key) => li = li.replace(new RegExp('\\{\\{'+key+'\\}\\}','gi'), val));
  li = filterEmoji(li)
  return li;
}

export function filterEmoji(template: string) : string{
  let emoji = ["微笑", "拱手", "心", "坏笑", "斜眼笑", "赞", "色"];
  var template1 = template;
  emoji.forEach(emoji => {
    template1 = template1.replace(new RegExp("\\["+emoji+"\\]", "ig"), `<img class="icon-txt-emoji" src="${assetMap.get("emoji-["+emoji+"]")}">`);
  })
  return template1;
}