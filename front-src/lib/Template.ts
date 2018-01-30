import * as _ from 'lodash'
export function TemplateRenderArray(template: string, data: any[]): string{
  let HTML = '';
  data.forEach( (data, index) => {
    let li = template.replace(new RegExp('\\{\\{_index\\}\\}', 'ig'), `${index}`);
    _.forOwn(data, (val, key) => li = li.replace(new RegExp('\\{\\{'+key+'\\}\\}','gi'), val));
    HTML += li;
  })
  template
  return HTML;
}

export function TemplateRenderObj(template: string, data: any): string{
  let li = template;
  _.forOwn(data, (val, key) => li = li.replace(new RegExp('\\{\\{'+key+'\\}\\}','gi'), val));
  return li;
}