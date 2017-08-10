"use strict";

angular.module('SpaceShooterApp').service('EnemyPool', function(GameLoop,Sprite,EnemyFactory){

	this.enemyEntities = [];
	this.enemies = [];
	var context = GameLoop.context;
	var enemySpeed = 2;

	var class1Ship = [{shield: 2, speed: 2}];
	var class2Ship = [{shield: 4, speed: 2}];

	//enemyStartPosition: {x,y}
	var enemyData = [
		{startX:0, startY:10, shipType: class1Ship},
		{startX: GameLoop.canvasHeight - 80,startY: 110, shipType: class1Ship},
		{startX: GameLoop.canvasHeight/2, startY: 220, shipType: class1Ship}
	];

	this.buildPool = function(enemyPoolMax){
		for (var i=0; i < enemyPoolMax; i++) {
			this.enemyEntities[i] = new Sprite(enemyData[i].startX,enemyData[i].startY,1);
			GameLoop.entities.push(this.enemyEntities[i]);
			this.enemies[i] = new EnemyFactory(this.enemyEntities[i], 2, 100, 10);
		}
	};

	var iterator = 0;

	this.moveEnemyShips = function(){
		if(this.enemies[iterator].sprite.isActive){
			if(this.enemies[iterator].sprite.x < GameLoop.canvasHeight - this.enemies[iterator].sprite.w && this.enemies[iterator].moveRight == true){
				this.enemies[iterator].sprite.moveRight(enemySpeed);
			}else if (this.enemies[iterator].sprite.x >= GameLoop.canvasHeight - this.enemies[iterator].sprite.w || this.enemies[iterator].moveRight == false && this.enemies[iterator].sprite.x != 0){
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
