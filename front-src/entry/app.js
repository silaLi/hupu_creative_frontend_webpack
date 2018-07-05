
import "../lib/reset-1.0.0.css"
import 'weui';
import './style.css';

import { RemInit } from '../lib/rem';
import { routes } from "../lib/page-router"
import { assetMap } from "../assets/assetUtil";
import $ from "jquery";
 
export const APP = {
  
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





