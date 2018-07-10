
import "../../lib/reset-1.0.0.css"
import 'weui';
import '../../pages/style.css';
import $ from "jquery";
import { RemInit } from "../../lib/rem"
import * as Utils from "../../lib/util";

// const index = new Index;
function initApp(){
  RemInit(550);
  Utils.getIosVersion((ver, verArr) => {
    if(verArr[0] == "10"){
      $("html").addClass("ios-10");
    }
  })
  // index.init();
}

initApp();




