
import "../lib/reset-1.0.0.css"
import 'weui';
import './style.scss';

import { RemInit } from '../lib/rem';
import { routes } from "../lib/page-router"
import { assetMap } from "../assets/assetUtil";
import $ from "zepto";
 
export const APP = {
  top5_list: window.top5_list,
  goal_baseline: window.goal_baseline > 100? window.goal_baseline: 100,
  fid: window.fid,
  token: window.token,
  SilentMode: false,
};

function initApp(){
  RemInit();
}
function ClosePage(){
  routes.pages.forEach(elem => {
    elem.page.hide();
  })
}

initApp();





