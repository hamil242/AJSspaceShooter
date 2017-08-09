angular.module('SpaceShooterApp').service('LaserPool', function(GameLoop,Sprite,EnemyPool,CollisonDetection){

	"use strict";

	this.laserEntities = [];
	this.enemyLaserEntities = [];
	this.score = 0;

 	var _shipSprite;

	var enemyFireHandOff = 0;
	var enemyShootDelaySeconds = 800;
	var enemyLastShotTime = 0;
	var enemyPoolRotator = 0;
	var enemyLaserSpeed = 4;

	var poolRotator = 0;
	var laserBoltSpeed = 7;

	var shootDelaySeconds = 300;
	var lastShotTime = 0;

	this.buildPool = function(laserPoolMax, enemyLaserPoolMax, shipSprite){
		_shipSprite = shipSprite;
		//for player
		for (var i=0; i < laserPoolMax + 1; i++) {
			this.laserEntities[i] = new Sprite(0,0,2);
			this.laserEntities[i].isActive = false;
			GameLoop.entities.push(this.laserEntities[i]);
		};
		//for enemy ships
		for (var j=0; j < enemyLaserPoolMax + 1; j++) {
				this.enemyLaserEntities[j] = new Sprite(0,0,3);
				this.enemyLaserEntities[j].isActive = false;
				GameLoop.entities.push(this.enemyLaserEntities[j]);
		};

	};

	this.resetLaserPools = function(){
		//for player
		for (var i=0; i < this.laserEntities.length; i++) {
			this.laserEntities[i].location(0,0);
			this.laserEntities[i].isActive = false;
		};
		//for enemy ships
		for (var j=0; j < this.enemyLaserEntities.length; j++) {
				this.enemyLaserEntities[j].location(0,0);
				this.enemyLaserEntities[j].isActive = false;
		};
	};

	this.fireLaserBolt = function(){
		if((new Date).getTime() > lastShotTime + shootDelaySeconds && _shipSprite.isActive){
			if(!this.laserEntities[poolRotator].isActive)
				this.laserEntities[poolRotator].isActive = true;
			//Set Starting position
			this.laserEntities[poolRotator].x = _shipSprite.x + _shipSprite.w/2;
			this.laserEntities[poolRotator].y = _shipSprite.y  - (_shipSprite.h - (this.laserEntities[poolRotator].h/2));
			poolRotator ++;
			if(poolRotator >= this.laserEntities.length)
				poolRotator = 0;
		}
		lastShotTime = (new Date).getTime();
	};

	this.enemyFireAI = function(){
		if((new Date).getTime() > enemyLastShotTime + enemyShootDelaySeconds){
			this.enemyLaserEntities[enemyPoolRotator].isActive = true;
			this.enemyLaserEntities[enemyPoolRotator].x = EnemyPool.enemies[enemyFireHandOff].sprite.x + (EnemyPool.enemies[enemyFireHandOff].sprite.w/2);
			this.enemyLaserEntities[enemyPoolRotator].y = EnemyPool.enemies[enemyFireHandOff].sprite.y + EnemyPool.enemies[enemyFireHandOff].sprite.h-10;
			enemyPoolRotator ++;
			enemyFireHandOff ++;
			if(enemyPoolRotator >= this.enemyLaserEntities.length)
				enemyPoolRotator = 0;
			if(enemyFireHandOff > EnemyPool.enemies.length - 1)
				enemyFireHandOff = 0;
			enemyLastShotTime = (new Date).getTime();
		}
	};

	this.moveLaserBolt = function(){
		for (var i=0; i < this.laserEntities.length; i++) {
			if(this.laserEntities[i].isActive){
				for (var j=0; j < EnemyPool.enemies.length; j++) {
					if(EnemyPool.enemies[j].sprite.isActive){
						if(CollisonDetection.collidesWithOther(this.laserEntities[i], EnemyPool.enemies[j].sprite) ){
							EnemyPool.enemies[j].enemyShipHit();
							this.laserEntities[i].isActive = false;
							this.score += 100;
						}
					}
				};
				this.laserEntities[i].moveUp(laserBoltSpeed);
				if(this.laserEntities[i].y < -40)
					this.laserEntities[i].isActive = false;
			};
		};
		for (var i=0; i < this.enemyLaserEntities.length; i++) {
			if(this.enemyLaserEntities[i].isActive){
				this.enemyLaserEntities[i].moveDown(enemyLaserSpeed);
				if(_shipSprite.isActive){
					if(CollisonDetection.collidesWithOther(this.enemyLaserEntities[i], _shipSprite) ){
						this.enemyLaserEntities[i].isActive = false;
						_shipSprite.isActive = false;
					}
				}
				if(this.enemyLaserEntities[i].y >= GameLoop.canvasHeight)
					this.enemyLaserEntities[i].isActive = false;
			}
		};

		return this.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

})
