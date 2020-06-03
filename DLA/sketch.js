//http://paulbourke.net/fractals/dla/
// http://www.flong.com/projects/dendron/
// https://thecodingtrain.com/CodingChallenges/034-dla.html

// We are going to make somthing similar to this http://paulbourke.net/fractals/dla/dlacircles1.png

// Required knowledge: Exercise about the Random Walker. (classes, randomness, position, velocity, etc..)
// Diffuse Limited Aggragation simulate a process of growth where something(in this case the walkers), walk toward something else (in this case the tree).
// When the walker reach the tree, it becomes part of the tree and it does not belong to the walkers anymore.
// Try to imagine a really cold element, the tree, that whenever get in contact with something that moves it frozes it.
// In the process that we are going to simulate, the walkers walk randomly from the border of the canvas, the first point of the tree
// is in the middle of the screen

// First part:
// Let's create a point in the middle of the screen, and lets put it inside the tree array
// To create this point, we will use the walker class

// Second part:
// lets now create a single walker that moves randomly. Let's add the method walk to the Walker class and
// let's move it. Let's constrain it's movement inside the screen
// We will use the same class, the Walker class, to create a Walker and the first elment of the tree
// in the constructor, we use arguments.length to detect if the element has to be position in a part of the screen
// and it is stuck, or if it is free to wander
// At this point, you should have one element in the middle of the screen and a point appearing in random position in the screen

// Third part
// create the function randomPoint that create points just on the borders of the canvas

// Fourth part. 
// A walker should stop whenever it touches the tree. How do we find this moment? comparing
// the distance between the position of the walker and all the point inside the tree.
// Let's write the method checkStuck. (note for the teacher: It is going to be used in sketch2)

// The elements inside the tree and the element inside the walkers are both instances of the same class
// Let's start to create the first element of our tree
// The Random walker start from the border, and reach a point.
// when it reach a point, the RW stops, and a new random walker starts from the border.

// 1 my final result is stored in a collection of walkers, let's call it tree.
// Let's start with one walker in the middle of the screen, that does not move, an another walker positioned randomly on the screen
// Let's start with 2 variable, the tree and a radius
// Let's start adding a point in the middle of the screen, a walker


let tree = [];
let radius = 8;


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
      if (d <this.r + others[i].r) {
        this.stuck = true;
        return true;
      }
    }
    return false;
  }

  this.show = function() {
    fill(255);
    circle(this.pos.x, this.pos.y, this.r*2);
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
    tree[i].show();
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