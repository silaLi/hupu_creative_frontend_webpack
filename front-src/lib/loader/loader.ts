const html = require('./loader.html');
import './loader.scss'
import { DomAPI } from '../../lib/DomAPI';


export default class Loader{
	DOMAPI: DomAPI;
	constructor(){
		this.DOMAPI = DomAPI.render(html);
		this.DOMAPI.appendTo('body');
	}
	show(){
		this.DOMAPI.addClass('loader-show')
	}
	hide(){
		this.DOMAPI.removeClass('loader-show')
	}
	remove(){
		this.DOMAPI.remove();
	}
	appended(p: Element){
		this.remove();
		this.DOMAPI.addClass('loader-container')
		DomAPI.render(p).append(this.DOMAPI.getElemList());
	}
}
export const loader = new Loader();
