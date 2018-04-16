
import "../lib/reset-1.0.0.css"
import 'weui';
import './style.scss';

import { RemInit } from '../lib/rem';
import { routes } from "../lib/page-router"
import { Load } from './load';
import { assetMap } from "../assets/assetUtil";
import { Intr } from "./intr";
import { GameEntry } from "./game-entry";
import { Game } from "./game";
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
  routes.set("LOAD", new Load().init());
  routes.set("INTR", new Intr().init());
  routes.set("GAME_ENTRY", new GameEntry().init());
  routes.set("GAME", new Game().init());

  routes.router("LOAD", () => {
    ClosePage();
    routes.get("LOAD").show();
  })
  routes.router("INTR", () => {
    ClosePage();
    routes.get("INTR").show();
  })
  routes.router("GAME_ENTRY", () => {
    ClosePage();
    routes.get("GAME_ENTRY").show();
  })
  routes.router("GAME", () => {
    ClosePage();
    routes.get("GAME").show();
  })
}
function ClosePage(){
  routes.pages.forEach(elem => {
    elem.page.hide();
  })
}

initApp();





