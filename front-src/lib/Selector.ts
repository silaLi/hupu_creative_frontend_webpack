import { DomAPI } from "./DomAPI";

export interface OptionItem{
	text: string;
	value: string;
}
export default class Selector {
	elem: HTMLSelectElement;
	domAPI: DomAPI;
	defaultItem = {text: '请选择', value: '请选择'};
	items: OptionItem[] = [];
	selectedIndex: number;
	change = (selector: Selector) => {};
	initData = (item: OptionItem[]) => {};
	constructor(elem: HTMLSelectElement, selectedIndex?: number) {
		this.elem = elem
		this.domAPI = DomAPI.render(this.elem);
		
		this.selectedIndex = selectedIndex !== undefined ? selectedIndex : -1;
	}
	init(){
		this.setItems(this.items);
		if (this.elem) {
			this.elem.onchange = () => {
				this.setValueByIndex(this.elem.selectedIndex - 1);
			};
		}
	}
	setItems(items: OptionItem[]){
		this.items = items;
		this.initData && this.initData(this.items);

		let options: OptionItem[] = [this.defaultItem];
		options = options.concat(this.items);

		this.elem.innerHTML = ''
		if (this.elem) {
			var html = '';
			// 为什么不用innerHTML，因为在IE9的时候会不能插入这标签
			for (var i = 0; i < options.length; i++) {
				options[i].value = options[i].value || options[i].text;
				var option = document.createElement('option');
				option.setAttribute('value', options[i].value);
				option.innerText = options[i].text;
				this.elem.appendChild(option)
				// html += '<option value="'+options[i].value+'">'+options[i].text+'</option>'
			}
			// this.elem.innerHTML = html;
		}
		this.setValueByIndex(-1);
	}
	getValue(){
		return this.items[this.selectedIndex] || {text: '', value: ''};
	}
	getSelectedIndex(){
		return this.selectedIndex;
	}
	setElemValueByIndex(index: number){
		this.domAPI.find('option[selected]').removeAttr('selected');
		this.domAPI.find('option').eq(this.selectedIndex + 1).setAttr('selected', 'selected');
	}
	setValueByIndex(index: number){
		if (this.selectedIndex !== index) {
			this.selectedIndex = index;
			this.setElemValueByIndex(index);
			this.change(this)
		}else if(this.selectedIndex < 0){
			this.selectedIndex = -1;
			this.setElemValueByIndex(index);
			this.change(this)
		}
	}
}

