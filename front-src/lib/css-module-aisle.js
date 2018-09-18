import * as _ from "lodash";

/**
 * css-module处理器 
 * 处理对象为html字符串
 * 需要html-loader配合参数options: { removeAttributeQuotes: false }
 * strict: Strict mode; default true, when has no the className, return space string
 */
export function thorough(html, style, strict = true){
  return html.replace(/class=\"(.*?)\"/g, function (a, b, c) {
    let bArr = b.split(" ");
    if (bArr.length > 0)
      return `class="${_.map(bArr, classNameItem => {
        if(strict){
          return style[classNameItem]? style[classNameItem]: "";
        }else{
          return style[classNameItem]? style[classNameItem]: classNameItem;
        }
      }).join(" ")}"`;
    else
      return "";
  })
}