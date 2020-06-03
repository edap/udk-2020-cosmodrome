
// But... nothing happens, the walker appears randomly on screen, they do not "walk"
// Part one: Let's creat an array of maxWalkers that moves randomly until they reach
// one element in the tree and they get stucked. We will create them in the setup method
// they will walk in the draw method

// Part two: But it is super slow, it takes a lot of time before all the walkers
// reach the center!
// What we can do, is to make a loop that enclose the loop in the draw method, that one that contains
// the checkStuck method. We will loop nIteration times
// The other things that we can do, shortly after, is to make a loop that spawns new Walkers
// as soon as the total number of walkers is under maxWalkers.
// We are going to have a problem now, the algorithm does not have an ending condition anymore,
// and new walkers keep get adding on the border of the canvas, although the tree already occupies the screen.
// We will fix this later when we are going to change the radius. But first, let's add some colors!


let tree = [];
let radius = 8;

// Part 1
let maxWalkers = 50;
let walkers = [];

// Part 2
let nIteration = 20;


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
      if (d < this.r + others[i].r) {
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
    // vel = vel.mult(noise(millis())*50); // uncomment to move faster
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
}

function setup() {
  createCanvas(400, 400);
  background(0)

  tree[0] = new Walker(width/2, height/2);

  //Part one: let's position some random walker at the beginning
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

  // Part one: draw all the walkers
  for (var i = 0; i < walkers.length; i++) {
    walkers[i].show();
  }

  // Part one:
  // This is basically the core of the algorithm. Once you get this, the rest is just an 
  // improvement of this part
  for (var i = walkers.length - 1; i >= 0; i--) { // backwards loop, how does it work?
    // and why do we loop backwards?
    // Note for the teacher, explain which problem do you find when looping forward and removing
    // element at the current iteration index => all the index get update and the next one it
    // is not what it is supposed to be anymore. It is way easier to loop backwards
    // and remove the current element, because the next element in the loop they are still
    // the same and the indexes are still untouched. This is important! Explain on the board.
    walkers[i].walk();
    if (walkers[i].checkStuck(tree)) {
      // if a walker get stucked, take it out of the array walkers array (using splice,
      // check the JS documentation about this function )
      // and put it into the three array.
      // the tree array is just a collection of stucked walkers!
      tree.push(walkers[i]);
      walkers.splice(i,1);
    }
  }


  // // Part two: add a loop more
  // for (var n = 0; n < nIteration; n++) {
  //   for (var i = walkers.length - 1; i >= 0; i--) { // backwards loop, how does it work?
  //     walkers[i].walk();
  //     if (walkers[i].checkStuck(tree)) {
  //       tree.push(walkers[i]);
  //       walkers.splice(i,1);
  //     }
  //   }
  // }

  // // Part two, keep spanning workers.
  // while (walkers.length < maxWalkers) {
  //   walkers.push(new Walker());
  // }

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