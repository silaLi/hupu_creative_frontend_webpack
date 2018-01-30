import '../style/style.scss';


import { RemInit } from '../lib/Rem';
import { routes } from './router';
import { WeChatCall } from './wechat-call/index';


function initApp(){
  RemInit();
  routes.set('WeChatCall', new WeChatCall());

  

  routes.router('WeChatCall', () => {
    closePage();
    let page = routes.get('WeChatCall')
    page && page.show();
  });
}
function closePage(){
  routes.pages.forEach( page => {
    page.page.hide();
  })
}

initApp();

routes.go('WeChatCall');