import $ from "jquery";
import weui from "weui.js";
import * as _ from "lodash";
import { APP } from "./appStore";
import wx from "wx";
import qs from "qs";

function random() {
  return Math.floor(Math.random() * 200) + 100
}

export function Log(msg){
  if(!APP.debug){
    return;
  }
  $.ajax({
    url: "/log?"+msg
  })
}