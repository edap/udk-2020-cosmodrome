// First part:
// Change the radius, the more walkers become part of the tree, the smaller the global
// variable radius becomes. 
// add a shrink variable, and shrink the radius by a certain amount everytime a walker is added
// to the tree

// Second part:
// add an ending condition, do not spawn any new walker when the radius is less than 1
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
        this.pos = randomPoint();
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
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}


function setup() {
    colorMode(HSB);
    createCanvas(400, 400);
    background(0)
    tree[0] = new Walker(width / 2, height / 2);
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
                // Each time a point stick, decrease the radius
                radius *= shrink;
                walkers[i].setHue(hu % 360);
                hu += 2;
                tree.push(walkers[i]);
                walkers.splice(i, 1);
            }
        }
    }

    // ending condition
    // while (walkers.length < maxWalkers) {
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
