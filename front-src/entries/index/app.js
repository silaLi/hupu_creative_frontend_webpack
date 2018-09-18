import "../../lib/reset-1.0.0.css";
import 'weui';
import "swiper/dist/css/swiper.css";
import '../../pages/style.css';
import { routes } from "../../lib/page-router";
import { APP } from "../../pages/appStore";
import $ from "jquery";

const empty = ()=>{};
initAPPData();
runPage();
function runPage(){
  initApp();
  routesGo();
}
function routesGo(){
  routes.go("page1")
}
function initAPPData(){
 
}
function initApp() {
  APP.rem.maxWidth = 1000;
  APP.rem.designSize = 750;
  APP.rem.init();

  routes.set("demo", new Demo().init())
  
  routes.router("demo", function(){
    routes.get("demo").show();
  })
}






