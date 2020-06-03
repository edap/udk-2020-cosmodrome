// 5 let's increate the performance. The squares root is a notorius slow operation
// 6 you see that when the tree reach the border, it continue to grow. Let's limit this
// remove the part
// while (walkers.length < maxWalkers) {
//     walkers.push(new Walker());
// }
// And start with an high number of maxWalkers

let tree = [];
let radius = 6;
let walkers = [];
let hu = 0;
let nIteration = 200;
let maxWalkers = 1000;

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
      //let d = p5.Vector.dist(this.pos, others[i].pos);
      //let d = p5.Vector.dist(this.pos, others[i].pos);
      let d = myDist(this.pos, others[i].pos);

      // 5 now insteas of checking the squared distance, i compare it with that one from my new function
      // 
      if (
        d <
        // 5 this.r/2 + others[i].r/2
        this.r * this.r + others[i].r * others[i].r + 2 * others[i].r * this.r
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

  this.setHue = function(hu) {
    this.hu = hu;
  };

  this.show = function() {
    noStroke();
    if (this.stuck) {
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

  for (let n = 0; n < nIteration; n++) {
    for (let i = walkers.length - 1; i >= 0; i--) { // backwards loop, how does it work?
      walkers[i].walk();
      if (walkers[i].checkStuck(tree)) {
        walkers[i].setHue(hu % 360);
        hu += 2;
        tree.push(walkers[i]);
        walkers.splice(i,1);
      }
    }
  }

  // Even when they get stucked I keep adding new walkers, so that the tree
  // can grow faster
//   while (walkers.length < maxWalkers) {
//     walkers.push(new Walker());
//   }

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


//5
// eucledian distance without the square root part
function myDist(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    //return sqrt(dx * dx + dy * dy);
    return dx * dx + dy * dy;
}