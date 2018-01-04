import '../style/style.scss';


import { RemInit } from '../lib/Rem';
import { routes } from './router';

import { Page1 } from "./page-1/page-1";


function initApp(){
  RemInit();
  routes.set('page1', new Page1());

  

  routes.router('page1', () => {
    closePage();
    routes.get('page1').show();
  });
  routes.router('page2', () => {
    closePage();
    routes.get('page2').show();
  });
  routes.router('page3', () => {
    closePage();
    routes.get('page3').show();
  });
  routes.router('page4', () => {
    closePage();
    routes.get('page4').show();
  });
  routes.router('page5', () => {
    closePage();
    routes.get('page5').show();
  });
}
function closePage(){
  routes.pages.forEach( page => {
    page.page.hide();
  })
}

initApp();

routes.go('page1');