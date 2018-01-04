export const version = '0.0.1';
let _window: any = window;
let _document: any = document;
_window.onresize = RemInit;

let _fontSize = 0;
/**
 * 初始化Rem
 * 
 * @export
 */
export function RemInit(): void {
	let c: HTMLElement = _document.getElementsByTagName('html')[0];
	let b: number = c.clientWidth;
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
export default function px(rem: number, designSize: number = 640): number {
	// $rem / 640 * 3.2 * 1rem;
	return Math.ceil(rem / designSize * 3.2 * _fontSize);
}
