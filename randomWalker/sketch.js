// Lesson from "the nature of code"
// https://natureofcode.com/book/chapter-1-vectors/#intro_section2

// 1 what is a vector. Check the reference page:
// https://p5js.org/reference/#/p5/createVector
// https://p5js.org/reference/#/p5.Vector
// create a mover class

// 2 add accelleration Limit it. Try to remove the limit

// 3 random acelleration

// 4 interactivity. The walker accellerate toward the mouse.
// How to get the direction between two vectors

// 5 create an array of random walkers

function Mover(){
  this.location = createVector(random(width), random(height));
  this.velocity = createVector(random(-2, 2), random(-2, 2));
  this.acceleration = createVector(-0.001,0.01); // 2 a constant accelleration, for now
  this.topspeed = 10; //2

  this.update = function() {
    // 4 Move towards the mouse. Delete part 3
    let mouse = createVector(mouseX,mouseY);
    let dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.5);
    this.acceleration = dir;


    //3 Random acelleration
    // this.acceleration = p5.Vector.random2D(); //3 We are not only changing the speed here, but also the direction
    // // Exercise, could you change the acelleration using noise?
    // // https://p5js.org/reference/#/p5/noise
    // this.acceleration.mult(random(2));

    //2
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
  
    // 1
    this.location.add(this.velocity);
  }
     
  this.display = function() {
    stroke(0);
    fill(10,20,175);
    ellipse(this.location.x,this.location.y,16,16);
  }
     
  this.checkEdges = function() {
    if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = width;
    }
  
    if (this.location.y > height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    }
  }
}

let mover;

// 5

let movers = [];

function setup() {
  createCanvas(400, 400);
  mover = new Mover();

  for (let i = 0; i < 60; i++) {
    movers[i] = new Mover();
  }
}

function draw() {
  background(250,60,40);
  mover.update();
  // 4 remove check edges
  mover.checkEdges();
  mover.display();

  // 5. Uncomment previous block
  // for (let i = 0; i < movers.length; i++) { 
  //   movers[i].update();
  //   //movers[i].checkEdges();
  //   movers[i].display();
  // }
}