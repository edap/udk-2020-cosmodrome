// To add colors we use the HSB color space
// We add the variable this.hue and the setHue method, we add a global variable hu,
// to save the current hu
// and we call the setHue method when a walker get stucked

let tree = [];
let radius = 8;
let walkers = [];
let nIteration = 200;
let maxWalkers = 200;

// define a hue gloabal variable
let hu = 0;

function Walker(x, y){
  if (arguments.length == 2) {
    this.pos = createVector(x, y);
    this.stuck = true;
  } else {
    this.pos = randomPoint();
    this.stuck = false;
  }
  this.r = radius;

  this.checkStuck = function(others) {
    for (var i = 0; i < others.length; i++) {
      var d = p5.Vector.dist(this.pos, others[i].pos);
      if ( d < this.r + others[i].r ) {
        this.stuck = true;
        return true;
      }
    }
    return false;
  }

  // a method to set the color of a walker
  this.setHue = function(hu) {
    this.hu = hu;
  };

  this.show = function() {
    // if the walker is stucked, draw it with its color, otherwise white
    noStroke();
    if (this.stuck && typeof this.hu !== 'undefined') {
        fill(this.hu, 255, 100, 200);
      } else {
        fill(360, 0, 255);
      }
      circle(this.pos.x, this.pos.y, this.r * 2);

  }

  this.walk = function(){
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
}


function setup() {
  // Set HSB color mode
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

  for (var n = 0; n < nIteration; n++) {
    for (var i = walkers.length - 1; i >= 0; i--) {
      walkers[i].walk();
      if (walkers[i].checkStuck(tree)) {
        // just a way to cahnge the color rotating on the color wheel
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