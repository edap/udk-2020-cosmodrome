// Add a slider
let alignSlider, cohesionSlider;

// Add cohesion
// Get the average location of my local "flock mates" and steer towards them.


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
    
    this.align = function(boids){
      let perceptionRadius = 50;
      let steering = createVector();
      let total = 0;

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
    
    // the cohesion method is almost the same thing as the alignment
    this.cohesion = function(boids){
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
          let d = dist(
            this.location.x,
            this.location.y,
            other.location.x,
            other.location.y
          );
          if (other != this && d < perceptionRadius) {
            // this is the only thing that change
            // we add the location and not the velocity
            steering.add(other.location);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
          // steering contain the average location
          // I want to add a force towards that steering location
          // so, in this case force = destination - my local position
          // that translate in code in steering.sub(this.location);
          steering.sub(this.location);
          steering.setMag(this.maxSpeed);
          steering.sub(this.velocity);
          steering.limit(this.maxForce);
        }
        return steering;
      
    }
    this.flock = function(boids){
        let cohesion = this.cohesion(boids);
        let alignment = this.align(boids);
        // with a slider we can play with values while looking at the sketch
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());


        this.acceleration.add(alignment); // try to comment out alignment and see what happens, try to change the perception radius of the cohesion
        this.acceleration.add(cohesion);

    }
  }
  
  
  let boids = [];
  
  function setup() {
    createCanvas(400, 400);
    // create a slider https://p5js.org/examples/dom-slider.html
    alignSlider = createSlider(0, 2, 1, 0.1);
    alignSlider.position(10, 20);

    cohesionSlider = createSlider(0, 2, 1, 0.1);
    cohesionSlider.position(10, 40);
  
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

    text('al.', alignSlider.x * 2 + alignSlider.width, 20);
    text('co.', cohesionSlider.x * 2 + cohesionSlider.width, 40);
  }