import * as PIXI from "pixi.js";
import { PxToRem } from "../../lib/rem.js";
import { assetMap } from "../../assets/assetUtil.js";

export class Background{
	constructor(gameContainer, stage){
		this._pasued = true;
		this._speed = 5;
		this._mode = "dom";
		this._mode = "webgl";
		this.stage = stage;
		this.DOM = gameContainer.find(".bg");
    this._topDefault = -3175;
		this._top = this._topDefault;

		console.log("game background mode is: ", this._mode);
		if(this._mode == "dom"){
			this.renderDom();
		}else if(this._mode == "webgl"){
			this.renderWebgl();
		}
	}
	renderDom(){
		this.DOM.append(assetMap.getDom("bgGame").cloneNode()).append(assetMap.getDom("bgGame").cloneNode());
		this._height = assetMap.getDom("bgGame").naturalHeight;
	}
	renderWebgl(){
		let stage = this.stage;
		
		this.bgSprites1 = [];
		this.bgSprites2 = [];
		this._height = 0;
		for(var index = 1; index <= 10; index++){
			let base, texture, sprite, textureImage;
			textureImage = assetMap.getDom("bg_game-part_"+index);
			base = new PIXI.BaseTexture(textureImage);
			texture = new PIXI.Texture(base);
			this._height += textureImage.naturalHeight;

			sprite = new PIXI.Sprite(texture);
			sprite.x = 0;
			sprite.y = this._topDefault + (index - 1) * 456;
			stage.addChild(sprite);
			this.bgSprites1 = [...this.bgSprites1, sprite];

			sprite = new PIXI.Sprite(texture);
			sprite.x = 0;
			sprite.y = this._topDefault + (index - 1) * 456 + this._height;
			stage.addChild(sprite);
			this.bgSprites2 = [...this.bgSprites2, sprite];
		}
	}
	setSpeed(speed){
		this._speed = speed;
	}
	play(){
		if(this._pasued === true){
			// 当前是暂停状态
			return
		}
    this._top += this._speed;
		this._top = this._top % this._height;
		if(this._mode == "dom"){
			const backgroundTransform = `translate3d(0, ${PxToRem(this._top - this._height)}, 0)`;
    	this.DOM.css({transform: backgroundTransform, "-webkit-transform": backgroundTransform});
		}else if(this._mode == "webgl"){
			// this.bgSprite2.y = this._top - this._height + this._height;
			this.bgSprites1.forEach((sprite, index) => {
				sprite.y = this._top + index * 456 - this._height;
			});
			this.bgSprites2.forEach((sprite, index) => {
				sprite.y = this._top + index * 456 - this._height + this._height;
			});
		}
		
	}
	start(){
		this._pasued = false;
	}
	stop(){
		this._pasued = true;	
	}
}