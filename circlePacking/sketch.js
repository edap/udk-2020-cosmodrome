// credits to https://generativeartistry.com/tutorials/circle-packing/
// https://www.youtube.com/watch?v=XATr_jdh-44
const circles = [];
const minRadius = 2;
const maxRadius = 100;
const totalCircles = 500;
const createCircleAttempts = 500;
const size = 400;
 
// Our steps will be:
//     Create a new Circle
//     Check to see if the circle collides with any other circles we have.
//     If it doesn’t collide, we will grow it slightly, and then check again if it collides.
//     Repeat these steps until we have a collision, or we reach a “max size”
//     Create another circle and repeat x times.
	

function createAndDrawCircle() {
  var newCircle;
  var circleSafeToDraw = false;
  for(var tries = 0; tries < createCircleAttempts; tries++) {
    newCircle = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
      radius: minRadius
    }
    
    if(doesCircleHaveACollision(newCircle)) {
      continue;
    } else {
      circleSafeToDraw = true;
      break;
    }
  }

  if(!circleSafeToDraw) {
    return;
  }

  for(var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
    newCircle.radius = radiusSize;
    if(doesCircleHaveACollision(newCircle)){
      newCircle.radius--;
      break;
    } 
  }
  // Draw the circle
  circles.push(circle);
  noFill();
  circle(newCircle.x, newCircle.y, newCircle.radius);
}

function doesCircleHaveACollision(circle) {
  for(var i = 0; i < circles.length; i++) {
    var otherCircle = circles[i];
    var a = circle.radius + otherCircle.radius;
    var x = circle.x - otherCircle.x;
    var y = circle.y - otherCircle.y;

    if (a >= Math.sqrt((x*x) + (y*y))) {
      return true;
    }
  }
  
  if(circle.x + circle.radius >= size ||
     circle.x - circle.radius <= 0) {
    return true;
  }
    
  if(circle.y + circle.radius >= size ||
      circle.y - circle.radius <= 0) {
    return true;
  }
  
  return false;
}

function setup(){
  createCanvas(size, size);
  noLoop();
};

function draw(){
  for(let i = 0; i < totalCircles; i++ ) {  
    createAndDrawCircle();
  }
};