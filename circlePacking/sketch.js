// Credits:
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE


// Intro to object, contstructor and classes
// Use the class to draw an array of circles
// intro to the noLoop trick in the draw call, it stops after a while
// draw 5 circles at time, with 20fps
// 1 Improve the newCircle function, do not draw on top of each other.

// 2, add the grow function to the Cirlce

// 3, check when to grow and when to stop

const circles = [];
const maxAttempts = 30;
let nCirclesPerDrawCall = 5;
// 4const maxNumberOfCircles = 60;

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 1;
  // 3 this.growing = true;

  // 2
  // this.grow = function() {
  //   if (this.growing) {
  //     this.r += 1;
  //   }
  // };

  this.show = function() {
    stroke(255);
    noFill();

    strokeWeight(2);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };

  this.edges = function() {
    return (
      this.x + this.r >= width ||
      this.x - this.r <= 0 ||
      this.y + this.r >= height ||
      this.y - this.r <= 0
    );
  };
}

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(0);
  frameRate(20);

  let count = 0;
  let attempts = 0;

  // everytime the draw function is called, try to create nCirclesPerDrawCall
  // not try forever, just try n maxAttempts. If the circle is created, increment the count variable
  while (count < nCirclesPerDrawCall) {
    let newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    // if (attempts > maxAttempts) {
    // 4 if (attempts > maxAttempts || circles.length > maxNumberOfCircles) {
      noLoop();
      console.log('finished');
      break;
    }
  }

  // 3here grows
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    // 3
    // if (circle.growing) {
    //   if (circle.edges()) {
    //     circle.growing = false;
    //   } else {
    //     for (let j = 0; j < circles.length; j++) {
    //       let other = circles[j];
    //       if (circle !== other) {
    //         let d = dist(circle.x, circle.y, other.x, other.y);
    //         let distance = circle.r + other.r;

    //         if (d - 2 < distance) {
    //           circle.growing = false;
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }

    circle.show();
    // 2
    //circle.grow();
  }
}

function newCircle() {
  let x = random(width);
  let y = random(height);

  // 1
  // let valid = true;
  // for (let i = 0; i < circles.length; i++) {
  //   let circle = circles[i];
  //   let d = dist(x, y, circle.x, circle.y);
  //   if (d < circle.r) {
  //     valid = false;
  //     break;
  //   }
  // }
  // if (valid) {
  //   return new Circle(x, y);
  // } else {
  //   return null;
  // }

  return new Circle(x,y);
}