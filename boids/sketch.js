// Lesson from "the nature of code"
// https://natureofcode.com/book/chapter-6-autonomous-agents/
// http://www.red3d.com/cwr/boids/

// Autonmous agents:
// 3 rules: an AA has no leader, an AA calculates its actions depending on its environment, an AA has a limited ability to perceive its environment

// We will start from our beloved Walker class, for this occasion renamed in Vehicle


// Reference pages about vectors:
// https://p5js.org/reference/#/p5/createVector
// https://p5js.org/reference/#/p5.Vector
// create a mover class


function Boid(){
    this.location = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4)); // the magnitude of a vector. Do you remember what it is?
    this.acceleration = createVector();
    this.maxSpeed = 4;
  
    this.update = function() {
      this.location.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
    }
       
    this.display = function() {
      stroke(0);
      fill(10,20,175);
      ellipse(this.location.x,this.location.y,16,16);
    }
       
    this.edges = function() {
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
  
    this.align = function(){
  
    }
  
    this.separate = function(){
      
    }
  
    this.cohesion = function(){
      
    }
  
    this.flock = function(){
      
    }
  }
  
  
  let boids = [];
  
  function setup() {
    createCanvas(400, 400);
  
    for (let i = 0; i < 60; i++) {
      boids[i] = new Boid();
    }
  }
  
  function draw() {
    background(250,60,40);
    for (let i = 0; i < boids.length; i++) {
      boids[i].edges();
      boids[i].update();
      boids[i].display();
    }
  }