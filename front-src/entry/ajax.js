import $ from "zepto";
import { APP } from "./app";
import weui from 'weui.js';

function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export function SendPhoneAjax(phone, goal, callback) {
  const name = APP.name;
  const data = {
    name,
    goal,
    phone,
    fid: APP.fid,
    token: APP.token,
  }
  const dataJSON = JSON.stringify(data);
  const dataBase64 = utf8_to_b64(dataJSON);
  const $div = $(`<div style="z-index: 100;;position: fixed;top: 0;left: 0;width: 100%;height: 100%;"></div>`);
  $div.appendTo("body");
  $.ajax({
    url: "//mns.hupu.com/madrid_derby/ajax/submit_goal",
    data: {ciphertext: dataBase64},
    type: "post",
    dataType: "json",
    success: (res) => {
      if(res.code == 0){
        weui.alert("提交成功");
        APP.top5_list = res.data.top5_list;
        callback();
      }else{
        weui.alert(res.message);
      }
    },
    error: () => {
      weui.alert('网络错误');
    },
    complete: () => {
      $div.remove();
    }
  })
}