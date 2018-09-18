let _window = window;
let _document = document;

export class Rem{
	constructor(){
		this.designSize = null;
		this.maxWidth = null;

		this._inited = false;
		_window.onresize = () => {
			this._inited = false;
			this.init();
		}
	}
	init(){
		if(this._inited){
			return ;
		}
		this._inited = true;
		let c = _document.getElementsByTagName('html')[0];
		let b = c.clientWidth;
		b = b > this.maxWidth? this.maxWidth : b;
		
		this.fontSize = b / 20 / 16 * 100
		c.style.fontSize = this.fontSize + 'px';
	}
	toPX(remNum = 0){
		return Math.ceil(remNum / this.designSize * 3.2 * this.fontSize);
	}
	PxToRem(px = 0) {
		return px / this.designSize * 3.2 + "rem";
	}
}
