"use strict";

angular.module('SpaceShooterApp').factory('Sprite', function(GameLoop,LoadAssets){

	//Constructor, with class name
	function Sprite(x_position, y_position, image_index){

		this.image = LoadAssets.imageAssets[image_index];

		this.w = this.image.width;
		this.h = this.image.height;
		this.x = x_position;
		this.y = y_position;
		this.isActive = true;
		this.velocity = Math.random() > 0.5 ? -1 : 1;
	};

	Sprite.prototype.draw = function(){
		GameLoop.context.drawImage(this.image, this.x, this.y);
	};

	Sprite.prototype.moveRight = function(speed) {
		this.velocity = 1;
		this.x += this.velocity * speed;
	};

	Sprite.prototype.moveLeft = function(speed) {
		this.velocity = -1;
		this.x += this.velocity * speed;
	};

	Sprite.prototype.moveUp = function(speed) {
		this.velocity = -1;
		this.y += this.velocity * speed;
	};

	Sprite.prototype.moveDown = function(speed) {
		this.velocity = 1;
		this.y += this.velocity * speed;
	};

	Sprite.prototype.location = function (x,y) {
		this.x = x;
		this.y = y;
	};

	//Return the constructor function
	return Sprite;
})
