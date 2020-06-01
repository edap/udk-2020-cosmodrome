//http://paulbourke.net/fractals/dla/

// We are going to make this http://paulbourke.net/fractals/dla/dlacircles1.png

// How does it work"
// We know the random walker. The Random walker start from the border, and reach a point.
// when it reach a point, the RW stops, and a new random walker starts from the border.

// 1 my final result is stored in a collection of walkers, let's call it tree.
// Let's start with one walker in the middle of the screen, that does not move, an another walker positioned randomly on the screen
// Let's start with 2 variable, the tree and a radius
// Let's start adding a point in the middle of the screen, a walker


let tree = [];
let radius = 16;


function Walker(x, y){
  // Depending on how many arguments we pass, we decide if this is a walker that moves or if it is the point in the middle
  if (arguments.length == 2) {
    this.pos = createVector(x, y);
    this.stuck = true; // this is our Walker in the middle
  } else {
    this.pos = randomPoint();
    this.stuck = false;
  }
  this.r = radius;

  this.checkStuck = function(others) {
    for (var i = 0; i < others.length; i++) {
      var d = p5.Vector.dist(this.pos, others[i].pos);
      console.log(d);
      if (
        d <
        this.r + others[i].r
        //this.r * this.r + others[i].r * others[i].r + 2 * others[i].r * this.r
      ) {
        //if (random(1) < 0.1) {
        this.stuck = true;
        return true;
        // break;
        //}
      }
    }
    return false;
  }

  this.show = function() {
    strokeWeight(this.r);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }

  this.walk = function(){
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width); // keep the point on screen
    this.pos.y = constrain(this.pos.y, 0, height); // keep the point in the screen
  }
}


function setup() {
  createCanvas(400, 400);
  background(0)

  tree[0] = new Walker(width/2, height/2);

}

function draw() {
  background(0);

  // draw the tree.
  for (let i = 0; i< tree.length;  i++) {
    strokeWeight(tree[i].r);
    stroke(255);
    point(tree[i].pos.x, tree[i].pos.y);
  }

  let walker = new Walker();
  walker.walk(tree);
  walker.show();
}

// Member function and functions. This function is like setup and show, they do not belongs to the Walker
// Position point randomly just on the border.

function randomPoint() {
  var i = floor(random(4));

  if (i === 0) {
    var x = random(width);
    return createVector(x, 0);
  } else if (i === 1) {
    var x = random(width);
    return createVector(x, height);
  } else if (i === 2) {
    var y = random(height);
    return createVector(0, y);
  } else {
    var y = random(height);
    return createVector(width, y);
  }
}