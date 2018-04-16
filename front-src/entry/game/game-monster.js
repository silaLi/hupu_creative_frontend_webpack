import * as PIXI from "pixi.js";
import { assetMap } from "../../assets/assetUtil.js";
import * as _ from 'lodash';

export class Monster {
	constructor(stage){
		this._stage = stage;
		this.vyRate = 1;
		this.vy = 5;
		this.vx = 0;
		this.MoveX = 0;
		this._paused = true;
		this._lived = true;

		this.maxScale = 1.2;
		this.minScale = .8;

		this.scale = Math.random() * (this.maxScale -  this.minScale) + this.minScale;
		this.scale = 1;


		this.maxRotation = Math.PI * (10 / 180);
		this.minRotation = -Math.PI * (10 / 180);

		this.rotation = Math.random() * (this.maxRotation - this.minRotation) + this.minRotation;

		// console.log(this.rotation)
	}
	setSpeed(vy){
		this.vy = vy * this.vyRate;
	}
	play(){
		if(this._sprite && this._paused === false){
			if(this._typeName === "fail"){
				if(this.MaxX !== undefined && this.MinX !== undefined){
					if(this._sprite.x > this.MaxX || this._sprite.x < this.MinX){
						this.vx = -this.vx;
					}
					this._sprite.x += this.vx;
				}
				this._sprite.y += this.vy;
			}else{
				if(this.MaxMoveX !== undefined && this.MinMoveX !== undefined){
					if(this._sprite.x > this.MaxMoveX || this._sprite.x < this.MinMoveX){
						this.vx = -this.vx;
					}
					let a = this._sprite.x;

					this._sprite.x += this.vx
				}
				this._sprite.y += this.vy;
			}
			if(this._sprite.y >= this._rect.y + this._rect.h + this._sprite.height){
				this.destory();
			}
		}
	}
	/**
	 * 初始化显示
	 * 初始化起点和终点
	 * rect: {x, y, w, h}
	 */
	start(rect){
		if(!this._sprite){
			return;
		}
		this._paused = false;

		let minX = rect.x + this._sprite.width * .5;
		let maxX = rect.x - this._sprite.width * .5 + rect.w;
		this._sprite.visible = true;
		this.startX = minX + Math.floor(Math.random() * (maxX - minX));
		// this.endX = minX + Math.random() * (maxX - minX);

		this._sprite.x = this.startX;
		this.x = this._sprite.x;

		this._rect = rect;

		this.MaxX = maxX;
		this.MinX = minX;
		if(this.MoveX){
			this.MaxMoveX = this.x + this.MoveX;
			this.MinMoveX = this.x - this.MoveX;
		}
	}
	stop(){
		this._paused = true;
	}
	destory(){
		if(this._sprite){
			this._sprite.destroy();
		}
		this._sprite = null;
		this._paused = true;
		this._lived = false;
	}
	setMonster(name){
		const MONSTER_TYPE = [{
			name: "1",
			score: 8,
			image: assetMap.getDom("game-monster-1")
		}, {
			name: "2",
			score: 3,
			image: assetMap.getDom("game-monster-2")
		}, {
			name: "3",
			score: 10,
			image: assetMap.getDom("game-monster-3")
		}, {
			name: "4",
			score: 10,
			image: assetMap.getDom("game-monster-4")
		}, {
			name: "5",
			score: 5,
			image: assetMap.getDom("game-monster-5")
		}, {
			name: "6",
			score: 8,
			image: assetMap.getDom("game-monster-6")
		}, {
			name: "7",
			score: 5,
			image: assetMap.getDom("game-monster-7")
		}, {
			name: "8",
			score: 3,
			image: assetMap.getDom("game-monster-8")
		}, {
			name: "9",
			score: 10,
			image: assetMap.getDom("game-monster-9")
		}, {
			name: "fail",
			score: 0,
			image: assetMap.getDom("game-soccer")
		}, {
			name: "special",
			score: 0,
			image: assetMap.getDom("game-special")
		}]
		this._type = _.find(MONSTER_TYPE, type => type.name == name);
		if(!this._type){
			console.log("没有这种怪物:", name)
			this.destory();
			return;
		}
		if(this._type.name === "fail" || this._type.name === "special"){
			this._typeName = this._type.name;
		}else{
			this._typeName = "nor";
		}
		if(this._typeName === "fail"){
			this.vyRate = 1 + Math.random();
			if(Math.random() >= .5){
				this.vx = Math.random() * 2
			}else{
				this.vx =	Math.random() * -2
			}
		}
		if(this._typeName === "nor"){
			if(Math.random() >= .5){
				this.vx = Math.random() * 1
			}else{
				this.vx =	Math.random() * -1
			}
			this.MoveX = 5 + Math.floor(Math.random() * 20);
		}
		this._name = this._type.name;
		this._score = this._type.score;
		let base, texture, sprite, typeName, typeImage;

		typeName = this._type.name;
		typeImage = this._type.image;
    base = new PIXI.BaseTexture(typeImage);
    texture = new PIXI.Texture(base);
		sprite = new PIXI.Sprite(texture);
		sprite.height *= this.scale;
		sprite.width *= this.scale;
		sprite.y = -sprite.height * .5;
		sprite.rotation = this.rotation;
    sprite.pivot.x = sprite.width * .5;
    sprite.pivot.y = sprite.height * .5;
    sprite.visible = false;
		this._stage.addChild(sprite);
		
		this._sprite = sprite;
	}
}

 