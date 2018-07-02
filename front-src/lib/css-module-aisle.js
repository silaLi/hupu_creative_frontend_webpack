import * as _ from "lodash";

/**
 * css-module处理器 
 * 处理对象为html字符串
 * 需要html-loader配合参数options: { removeAttributeQuotes: false }
 */
export function thorough(html, style){
  return html.replace(/class=\"(.*?)\"/g, function (a, b, c) {
    let bArr = b.split(" ");
    if (bArr.length > 0)
      return `class="${_.map(bArr, classNameItem => {
        return style[classNameItem] || classNameItem
      }).join(" ")}"`;
    else
      return "";
  })
}