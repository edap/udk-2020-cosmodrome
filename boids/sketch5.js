// Now all together.

// what could you add? a slider for max force, max sedd pe

let alignSlider, cohesionSlider, separationSlider;

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
      this.acceleration.mult(0);
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
  
    this.separation = function(boids) {
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
            let diff = p5.Vector.sub(this.location, other.location);
            diff.div(d * d);
            steering.add(diff);
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
            steering.add(other.location);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
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
        let separation = this.separation(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        cohesion.mult(separationSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }
  }
  
  
  let boids = [];
  
  function setup() {
    createCanvas(400, 400);
    alignSlider = createSlider(0, 2, 1, 0.1);
    alignSlider.position(10, height+20);

    cohesionSlider = createSlider(0, 2, 1, 0.1);
    cohesionSlider.position(10, height+40);

    separationSlider = createSlider(0, 2, 1, 0.1);
    separationSlider.position(10, height+60);
  
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
    stroke(0);
  }