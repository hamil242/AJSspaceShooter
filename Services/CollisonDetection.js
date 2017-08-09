"use strict";

angular.module('SpaceShooterApp').service('CollisonDetection', function(){

  this.collidesWithOther = function (sprite1, sprite2){
    return !( sprite2.x           > (sprite1.x + sprite1.w) ||
             (sprite2.x + sprite2.w) <  sprite1.x           ||
              sprite2.y           > (sprite1.y + sprite1.h) ||
             (sprite2.y + sprite2.h) <  sprite1.y);
  };

})
