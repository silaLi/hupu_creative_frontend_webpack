import { initStart, initSuccess } from "./app"
import $ from "jquery";
import { routes } from "../../lib/page-router";
import { APP } from "../../pages/appStore";
import weui from "weui.js";

window.weui = weui;
// APP.debug = true
window.APP = APP;
// APP.userInfo = {
//   actionSignUpId: "EU=MkU0Q",
//   phone : "13883443264"
// }
// weui.alert(222);
$(function(){
  // routes.go("main");
  setTimeout(() => {
    console.log(APP)
    // routes.get("signUp").hide();
    // routes.get("page1").hide()
    // routes.get("wechat").setChatMsg(APP.wechatMsgNotFan[2])
    // routes.go("wechat-animation", ["page2"])
    // routes.go("page9");
    // routes.get("main").switch(2);
  }, 1000)
})



