angular.module('SpaceShooterApp').factory('ProjectileFactory', function(GameLoop,Sprite){

	"use strict";

	function Projectile(projectileSprite, projectileDamge, isPlayersProjectile){
		this.sprite = projectileSprite;
		this.damge = projectileDamge;
	};

	return Projectile;
})
