import { Page } from "../lib/Page";

class pagesItem{
  id: string;
  page: Page;
}
class routerPathItem{
  id: string;
  handle: (argu: Array<any>) => void;
}
export class Routes {
  pages: Array<pagesItem> = [];
  routerPath: Array<routerPathItem> = [];
  constructor() {
    
  }
  
  set(pageName: string, page: Page){
    this.pages.push({
      id: pageName,
      page: page
    })
  }
  get(pageName: string): Page{
    for(let i = this.pages.length - 1; i >= 0; i--){
      if(this.pages[i].id == pageName){
        return this.pages[i].page
      }
    }
  }
  
  router(sign: string, handle: () => void){
    this.routerPath.push({
      id: sign,
      handle: handle
    })
  }
  go(sign: string, argu: Array<any> = []){
    for(let i = this.routerPath.length - 1; i >= 0; i--){
      if(this.routerPath[i].id == sign){
        this.routerPath[i].handle(argu);
        return
      }
    }
    console.log(`there is no the sign: ${sign}`)
  }
}
export const routes: Routes = new Routes();