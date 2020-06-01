// 3 let's differentiate them, add some colors.
// Define a method setHue, that set the hue of the walker

// 4 let's increase the tree faster


let tree = [];
let radius = 6;
// let nIteration = 20;
// let maxWalkers = 50;
let walkers = [];
//3
let hu = 0;

// 4
let nIteration = 200;
let maxWalkers = 200;

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

  // 3
  this.setHue = function(hu) {
    this.hu = hu;
  };

  this.show = function() {
    //3
    noStroke();
    if (this.stuck && typeof this.hu !== 'undefined') {
        fill(this.hu, 255, 100, 200);
      } else {
        fill(360, 0, 255);
      }
      ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

  }

  this.walk = function(){
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
}


function setup() {
  // 3
  colorMode(HSB);
  createCanvas(400, 400);
  background(0)
  tree[0] = new Walker(width/2, height/2);
  for (var i = 0; i < maxWalkers; i++) {
    walkers[i] = new Walker();
  }
}

function draw() {
  background(0);
  for (let i = 0; i< tree.length;  i++) {
    tree[i].show();
  }

  // 2 This is basically the core of the algorithm
  for (var n = 0; n < nIteration; n++) {
    for (var i = walkers.length - 1; i >= 0; i--) { // backwards loop, how does it work?
      walkers[i].walk();
      if (walkers[i].checkStuck(tree)) {
        // 3
        walkers[i].setHue(hu % 360);
        hu += 2;
        tree.push(walkers[i]);
        walkers.splice(i,1);
      }
    }
  }

  while (walkers.length < maxWalkers) {
    walkers.push(new Walker());
  }

  for (var i = 0; i < walkers.length; i++) {
    walkers[i].show();
  }
}


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