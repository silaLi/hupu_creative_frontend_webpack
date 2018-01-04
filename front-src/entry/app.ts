import '../style/style.scss';


import { RemInit } from '../lib/Rem';
import { routes } from './router';

import { Page1 } from "./page-1/page-1";


function initApp(){
  RemInit();
  routes.set('page1', new Page1());

  

  routes.router('page1', () => {
    closePage();
    let page = routes.get('page1')
    page && page.show();
  });
}
function closePage(){
  routes.pages.forEach( page => {
    page.page.hide();
  })
}

initApp();

routes.go('page1');