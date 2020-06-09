
// Credits for this code goes to Daniel Shiffman https://thecodingtrain.com/CodingChallenges/145-2d-ray-casting.html

// 1 I need a boundary and a ray. A boundary is just a line. A ray is a point with a direction.
// does the ray it the boundary? yes, give me the position of the contact, no, do nothing.

function Boundary(x1,y1,x2,y2){
  this.a = createVector(x1, y1);
  this.b = createVector(x2, y2);

  this.show = function(){
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

function Ray(x,y){
  this.pos = createVector(x,y);
  this.dir = createVector(1,0); // this point to the right
  this.mag = 10; // this is a scalar that we use to draw a line
  // for the direction of the ray, just to make the direction visible.
  // a direction is a unit vector, that has lenght one, but this is not so visible for
  // our eyes.

  this.show = function(){
    stroke(255,0,0);
    push();
    translate(this.pos.x, this.pos.y);
    line(0,0, this.dir.x * this.mag , this.dir.y * this.mag);
    pop();
  }
}

let wall;
let ray;
function setup() {
  createCanvas(400, 400);
  wall = new Boundary(300,100, 300, 300);
  ray = new Ray(100,200);
  background(0)
}

function draw() {
  background(0);
  wall.show();
  ray.show();
}