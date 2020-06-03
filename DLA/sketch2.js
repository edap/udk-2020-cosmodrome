
// But... nothing happens, the walker appears randomly on screen, they do not "walk"
// 2 let's add them to the tree, nIteration each draw call, and let's save them in an array, walkers[]
// and let's create at the beginning some random walkers


let tree = [];
let radius = 16;

//2 
let nIteration = 20;
let maxWalkers = 50;
let walkers = [];


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


  // check all the point in the tree, if it is near anything that is in the tree, stuck it
  this.checkStuck = function(others) {
    for (var i = 0; i < others.length; i++) {
      var d = p5.Vector.dist(this.pos, others[i].pos);
      if (
        d <
        this.r/2 + others[i].r/2
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

  //2 let's position some random walker at the beginning
  for (var i = 0; i < maxWalkers; i++) {
    walkers[i] = new Walker();
  }


}

function draw() {
  background(0);
  // draw the tree.
  for (let i = 0; i< tree.length;  i++) {
    tree[i].show();
  }

  // 2 This is basically the core of the algorithm
  for (var n = 0; n < nIteration; n++) {
    for (var i = walkers.length - 1; i >= 0; i--) { // backwards loop, how does it work?
      walkers[i].walk();
      if (walkers[i].checkStuck(tree)) {
        // if a walker get stucked, take it out of the array walkers
        // and put it into the three array. the tree array is just a collection
        // a stucked walkers
        tree.push(walkers[i]);
        walkers.splice(i,1);
      }
    }
  }

  while (walkers.length < maxWalkers) {
    walkers.push(new Walker());
  }

  // 2 draw all the walkers
  for (var i = 0; i < walkers.length; i++) {
    walkers[i].show();
  }
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