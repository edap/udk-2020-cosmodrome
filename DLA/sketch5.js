// What can I do to have more variation?
// what if I add starting trees just at the bottom ? and we add walker in the setup method just at the top?
// what if I add walkers just on one side (see randomBottom function)

// have a look at http://paulbourke.net/fractals/dla/, particular to this image: http://paulbourke.net/fractals/dla/dla7.gif
// what if you add the trees at the beginning(let's call them seeds) around a circle (using polar coordinates maybe ;)


let shrink = 0.99;

let tree = [];
let radius = 8;
let walkers = [];
let hu = 0;
let nIteration = 50;
let maxWalkers = 100;

function Walker(x, y) {
    if (arguments.length == 2) {
        this.pos = createVector(x, y);
        this.stuck = true;
    }else {
        //this.pos = randomPoint();
        this.pos = randomBottom();
        this.stuck = false;
    }
    this.r = radius;

    this.walk = function () {
        let vel = p5.Vector.random2D();
        this.pos.add(vel);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }

    this.checkStuck = function (others) {
      for (var i = 0; i < others.length; i++) {
        var d = p5.Vector.dist(this.pos, others[i].pos);
        if ( d < this.r + others[i].r ) {
          this.stuck = true;
          return true;
        }
      }
      return false;
    }

    this.setHue = function (hu) {
        this.hu = hu;
    };

    this.show = function () {
        noStroke();
        if (this.stuck && typeof this.hu !== 'undefined') {
            fill(this.hu, 255, 100, 200);
        } else {
            fill(360, 0, 255);
        }
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}

function setup() {
    colorMode(HSB);
    createCanvas(400, 400);
    background(0)

    // add trees on the top
    for (var i = 0; i < width; i+= 40) {
      tree.push(new Walker(i, 50));
    }

    for (var i = 0; i < maxWalkers; i++) {
        walkers[i] = new Walker();
    }
}

function draw() {
    background(0);
    for (let i = 0; i < tree.length; i++) {
        tree[i].show();
    }

    for (var i = 0; i < walkers.length; i++) {
        walkers[i].show();
    }

    for (let n = 0; n < nIteration; n++) {
        for (let i = walkers.length - 1; i >= 0; i--) {
            walkers[i].walk();
            if (walkers[i].checkStuck(tree)) {
                radius *= shrink;
                walkers[i].setHue(hu % 360);
                hu += 2;
                tree.push(walkers[i]);
                walkers.splice(i, 1);
            }
        }
    }

    while (walkers.length < maxWalkers && radius > 1) {
        walkers.push(new Walker());
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

function randomTop() {
    var x = random(width);
    return createVector(x, 0);
}

function myDist(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return dx * dx + dy * dy;
}

function randomBottom() {
    var x = random(width);
    return createVector(x, height);
}


function myDist(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return dx * dx + dy * dy;
}