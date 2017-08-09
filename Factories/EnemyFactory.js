angular.module('SpaceShooterApp').factory('EnemyFactory', function(GameLoop,Sprite){

	"use strict";

	function Enemy(enemySprite, enemyHitPoints, enemyKillPointValue, enemyHitPointValue){
		this.moveRight = true;
		this.hitPoints = enemyHitPoints
		this.sprite = enemySprite;
		this.killPointValue = enemyKillPointValue;
		this.hitPointValue = enemyHitPointValue;
	};

	Enemy.prototype.enemyShipHit = function(){
		this.hitPoints--;
		if(this.hitPoints == 0)
			this.sprite.isActive = false;
	};

	return Enemy;
})
