export class Routes {
  constructor() {
    this.pages = [];
    this.routerPath = [];
  }
  
  set(pageName, page){
    this.pages.push({
      id: pageName,
      page: page
    })
  }
  get(pageName){
    for(let i = this.pages.length - 1; i >= 0; i--){
      if(this.pages[i].id == pageName){
        return this.pages[i].page
      }
    }
  }
  
  router(sign, handle){
    this.routerPath.push({
      id: sign,
      handle: handle
    })
  }
  go(sign, argu){
    for(let i = this.routerPath.length - 1; i >= 0; i--){
      if(this.routerPath[i].id == sign){
        this.routerPath[i].handle(argu);
        return
      }
    }
    console.log(`there is no the sign: ${sign}`)
  }
}
export const routes = new Routes();