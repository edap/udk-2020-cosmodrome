// Go to the first picture here http://www.red3d.com/cwr/boids/
// Separation
// Cohesion
// Alignment

// Let's start with the alignment


function Boid(){
    this.location = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxSpeed = 4;
    this.maxForce = 1;
  
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
    
    // each boid has its own direction, but that direction should be aligned with the average of the directions
    // of all the other boids. But not all, just that ones that are close, because, as we said before,
    // "AA has a limited ability to perceive its environment"
    this.align = function(boids){
      let perceptionRadius = 50;
      let steering = createVector(); // this will be the result
      let total = 0;
      // iterate through all the boids and add the velocity to the steering vector
      // IF they are inside the perception Radius
      for (let other of boids) {
        let d = dist(
          this.location.x,
          this.location.y,
          other.location.x,
          other.location.y
        );
        if (other != this && d < perceptionRadius) {
          steering.add(other.velocity);
          total++;
        }
      }
      // average the steering.
      // craig reyonods formula for steering says "steering force = desired velocity - current velocity"
      // see 6.3 The Steering Force of https://natureofcode.com/book/chapter-6-autonomous-agents/
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
  
    }
  
    this.separate = function(){
      
    }
  
    this.cohesion = function(){
      
    }
    this.flock = function(boids){
      let alignment = this.align(boids);
      this.acceleration.add(alignment);
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
      boids[i].flock(boids);
      boids[i].display();
    }
  }