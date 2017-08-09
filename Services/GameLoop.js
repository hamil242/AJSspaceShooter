	"use strict";

angular.module('SpaceShooterApp').service('GameLoop', function(){

	this.fps = 50;
	this.context;
	this.entities = [];

	this.canvasWidth = 650;
	this.canvasHeight = 700;
	this.gameOver = false;
	this.gamePaused = false;

	var text = "";

	this.initialize = function(){
		this.context = document.getElementById("gameCanvas").getContext("2d");
		console.log("Game initialize at :" + this.fps + "fps");
		this.context.font = "64px Arial";
		this.context.fillStyle = "white";
		this.context.textAlign = "center";
	};

	this.draw = function(){
		this.context.clearRect(0, 0, this.canvasHeight, this.canvasWidth);
		for (var i=0; i < this.entities.length; i++) {
			if(this.entities[i].isActive)
			this.entities[i].draw();
		}
		//if(!text === "")
			this.context.fillText(text, this.context.canvas.width/2, this.context.canvas.height/2);
	};

	this.drawText = function(newText) {
		text = newText;
	};

	this.clearText = function(){
		text = "";
	};

})
