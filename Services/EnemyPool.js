"use strict";

angular.module('SpaceShooterApp').service('EnemyPool', function(GameLoop,Sprite,EnemyFactory){

	this.enemyEntities = [];
	this.enemies = [];
	var context = GameLoop.context;
	var gameCanvas = 700;
	var enemySpeed = 2;

	this.buildPool = function(enemyPoolMax){
		for (var i=0; i < enemyPoolMax; i++) {
			this.enemyEntities[i] = new Sprite(0,0,1);
			GameLoop.entities.push(this.enemyEntities[i]);
			this.enemies[i] = new EnemyFactory(this.enemyEntities[i], 2, 100, 10);
		}
		this.enemyEntities[0].y = 10;

		this.enemyEntities[1].x = gameCanvas - 80;
		this.enemyEntities[1].y = 110;

		this.enemyEntities[2].x = gameCanvas/2;
		this.enemyEntities[2].y = 220;
	};

	var iterator = 0;

	this.moveEnemyShips = function(){
		if(this.enemies[iterator].sprite.isActive){
			if(this.enemies[iterator].sprite.x < gameCanvas - this.enemies[iterator].sprite.w && this.enemies[iterator].moveRight == true){
				this.enemies[iterator].sprite.moveRight(enemySpeed);
			}else if (this.enemies[iterator].sprite.x >= gameCanvas - this.enemies[iterator].sprite.w || this.enemies[iterator].moveRight == false && this.enemies[iterator].sprite.x != 0){
				this.enemies[iterator].moveRight = false;
				this.enemies[iterator].sprite.moveLeft(enemySpeed);
			}else if (this.enemies[iterator].sprite.x == 0){
				this.enemies[iterator].moveRight = true;
			}
		}else {
			this.enemies[iterator].sprite.x = 0;
			this.enemies[iterator].hitPoints = 2;
			this.enemies[iterator].sprite.isActive = true;
		};
		iterator++;
		if(iterator >= this.enemies.length)
			iterator = 0;
	};

})
