"use strict";

angular.module('SpaceShooterApp').service('LoadAssets', function(){

  var imagesList = [
    {url: 'Resources/blueShip.png'},
    {url: 'Resources/orb.png'},
    {url: 'Resources/laser.png'},
    {url: 'Resources/enemyShot.png'}
  ];

  this.imageAssets = [];

  this.loadAssets = function (){
    for (var i=0; i < imagesList.length; i++) {
      var image = new Image();
      image.src = imagesList[i].url;
      this.imageAssets.push(image);

    }
  };

  var loadImage = function(url){
    return new Promise((resolve, reject) =>{
      var image = new Image()
      image.onload = function() {
        resolve(image)
      }
      image.onerror = function() {
        let message =
          'Could not load image at ' + url
          reject(new Error(msg))
      }
      image.src = url
    })
  };
})
