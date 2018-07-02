let _window = window;
let _document = document;
let _maxPsd = null;
_window.onresize = () => {RemInit()};
let _init = false;
let _fontSize = 0;
/**
 * 初始化Rem
 * 
 * @export
 */
export function RemInit(maxPsd = _maxPsd) {
	_init = true;
	let c = _document.getElementsByTagName('html')[0];
	let b = c.clientWidth;
	b = b > maxPsd? b : maxPsd;
	
	_fontSize = b / 20 / 16 * 100
	c.style.fontSize = _fontSize + 'px';
}

/**
 * 通过rem获取px
 * 
 * @export
 * @param {number} rem 
 * @param {number} [designSize=640] 
 * @returns {number} 
 */
export function RemToPx(rem, designSize = 640) {
	if(_init == false){
		RemInit();
	}
	// $rem / 640 * 3.2 * 1rem;
	return Math.ceil(rem / designSize * 3.2 * _fontSize);
}

export function PxToRem(px, designSize = 640) {
	// $rem / 640 * 3.2 * 1rem;
	return px / designSize * 3.2 + "rem";
}
