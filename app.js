'use strict';

var app = angular.module('SpaceShooterApp', ['controllers']);

angular.module('controllers',['focus-if'])
.controller('GameController', function($scope,$http,GameLoop,LaserPool,
	EnemyPool,Player,LoadAssets){

	LoadAssets.loadAssets();
	GameLoop.initialize();
	var _context = GameLoop.context,
	_enemyPoolMax = 3,
	_laserPoolMax = 5,
 	_enemy_laserPoolMax = 10,
	//_url = 'https://ajsspaceshooter.mybluemix.net'
	_url = 'http://localhost:3000'
	$scope.show = false;
	$scope.lives = [{source:'Resources/blueShip_icon.png'},
	{source:'Resources/blueShip_icon.png'}];
	getHighScore();

	//Set up player.
	Player.initialize();
	//Build pools to rotate throw for sprites
	LaserPool.buildPool(_laserPoolMax,_enemy_laserPoolMax,Player.shipSprite);
	EnemyPool.buildPool(_enemyPoolMax);

	//***********Main Game Loop***********
    GameLoop.run = (function() {
        var loops = 0, skipTicks = 1000 / GameLoop.fps,
            maxFrameSkip = 10,
            nextGameTick = (new Date).getTime(),
						pauseTime = nextGameTick + 1000;

        return function() {
          loops = 0;

          while ((new Date).getTime() > nextGameTick) {
						if(!GameLoop.gamePaused){
          		EnemyPool.moveEnemyShips();
							LaserPool.enemyFireAI();
							$scope.$apply(function(){$scope.score = LaserPool.moveLaserBolt()});

							if(!Player.shipSprite.isActive){
								removePlayerLive();
								LaserPool.resetLaserPools();
								GameLoop.gamePaused = true;
								pauseTime = nextGameTick + 1000;
								GameLoop.drawText("Ready!");
							}
						}else if (pauseTime < nextGameTick) {
							GameLoop.gamePaused = false;
							Player.playerStartPosition();
							GameLoop.clearText();
						}
            nextGameTick += skipTicks;
            loops++;
          }
					if(!GameLoop.gameOver)
          	GameLoop.draw();
        };
    })();

    var gameInterval = window.setInterval(GameLoop.run, 0);
	//***********Main Game Loop***********

	if(GameLoop.gameOver){
		$scope.$apply(function () {
			$scope.final = {score: false};
		});
	}

	$scope.checkIfEnterKeyWasPressed = function($event){
		$event.preventDefault();
		var keyCode = $event.which || $event.keyCode;
		Player.movePlayer(keyCode);
	};

	function removePlayerLive() {
		if($scope.lives.length > 0){
			$scope.lives.splice(-1,1)};
		Player.playerLives --;
		if(Player.playerLives == 0){
			Player.shipSprite.isActive = false;
			GameLoop.draw();
			stopGame();
			$scope.$apply(function(){$scope.show = true});
		}
	};

	//End Game and display game over screen
	function stopGame() {
			clearInterval(gameInterval);
			GameLoop.gameOver = true;
			GameLoop.drawText("Game Over");
			GameLoop.draw();
	};

	//Get current highscore from Cloudant
	function getHighScore() {
		$http({method: 'GET',url: _url + '/highScore'})
		.then((response) => {
			var str = response.data.score.toString();
			$scope.highScore =  response.data.intaials + "-" +
			str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		})
		.catch((err) => {console.error(err)});
	};

	//Send final score to Cloudant
	$scope.submitScore = function() {
		var finalScore =  {"intaials": $scope.name,"score": LaserPool.score};

		$http({method: 'POST',url: _url + '/sendScore',
		headers: {'Content-Type': 'application/json'},
		params: finalScore})
		.catch((err) => {
			console.error(err);
		});
		$scope.show = false;
	};

})
