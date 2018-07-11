import $ from "jquery";

export class Selector {
	change = (selector) => {};
	initData = (item) => {};
	constructor(elem, selectedIndex) {
		this.defaultItem = {text: '请选择', value: '请选择'};
		this.items = [];

		this.elem = elem
		this.domAPI = $(this.elem);
		
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
	setItems(items){
		this.items = items;
		this.initData && this.initData(this.items);

		let options = [this.defaultItem];
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
	setElemValueByIndex(index){
		this.domAPI.find('option[selected]').removeAttr('selected');
		this.domAPI.find('option').eq(this.selectedIndex + 1).attr('selected', 'selected');
	}
	setValueByIndex(index){
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