import { DomAPI } from "./DomAPI";

export class Animation {
	DOMAPI: DomAPI;
	animationName: string;
	_complete = () => {};

	_animationEnd: (ev: Event) => void;
	constructor(elem: Element, animationName: string) {
		this.DOMAPI = DomAPI.render(elem);
		this.animationName = animationName;

		this._animationEnd = (ev: Event) => {
			this.DOMAPI.off('animationend webkitAnimationEnd oAnimationEnd', this._animationEnd);
			this._complete();
		}
	}
	run(complete: () => void){
		this._complete = complete;
		this.DOMAPI.addClass(this.animationName);
		this.DOMAPI.on('animationend webkitAnimationEnd oAnimationEnd', this._animationEnd);
	}
}
export class TransitionEvent {
	DOMAPI: DomAPI;
	_eventType = '';

	_eventHandler = () => {};

	_handlerRun: (ev: Event) => void;
	constructor(elem: Element, evntType: 'transitionend') {
		if(evntType == 'transitionend'){
			this._eventType = 'webkitTransitionEnd transitionend OTransition MozTransition';
		}
		this.DOMAPI = DomAPI.render(elem);

		this._handlerRun = (ev: Event) => {
			this.DOMAPI.off(this._eventType, this._handlerRun);
			this._eventHandler();
			this._eventHandler = () => {};
		}
	}
	run(eventHandler: () => void){
		this._eventHandler = eventHandler;

		this.DOMAPI.on(this._eventType, this._handlerRun);
	}
}