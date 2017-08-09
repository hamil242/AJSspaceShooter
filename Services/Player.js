	"use strict";

angular.module('SpaceShooterApp').service('Player', function(Sprite,GameLoop,LaserPool){

  var _shipSpeed = 15;
	this.playerLives = 3;

  this.initialize = function(){
    this.shipSprite = new Sprite(0,0, 0);
    GameLoop.entities.push(this.shipSprite);
		this.playerStartPosition();

  };

	this.playerStartPosition = function(){
		this.shipSprite.x = (GameLoop.context.canvas.width/2) - this.shipSprite.w;
		this.shipSprite.y = (GameLoop.context.canvas.height - this.shipSprite.h) - 20;
		if(!this.shipSprite.isActive)
			this.shipSprite.isActive = true;
	};

	this.movePlayer = function (keyCode) {
		switch(keyCode) {
			case 100:
				if(this.shipSprite.x < GameLoop.context.canvas.width - 55){
					this.shipSprite.moveRight(_shipSpeed);
				}
			break;
			case 97:
				if(this.shipSprite.x > 5){
					this.shipSprite.moveLeft(_shipSpeed);
				}
			break;
			case 32:
				LaserPool.fireLaserBolt();
			break;
			default:
		};
	};

})
