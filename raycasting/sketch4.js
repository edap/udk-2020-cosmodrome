
// 1 what if we create a lot of walls?
// 2 what if we shoot a lot of rays in all the direction?

function Boundary(x1,y1,x2,y2){
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  
    this.show = function(){
      stroke(255);
      line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
  
  // let change the constructor. A ray needs a position and a direction
  function Ray(pos, dir){
    this.pos = pos;
    this.dir = dir;
    this.mag = 100;
  
    this.show = function(){
      stroke(255,0,0);
      push();
      translate(this.pos.x, this.pos.y);
      line(0,0, this.dir.x * this.mag , this.dir.y * this.mag);
      pop();
    }


    this.lookAt = function(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    this.cast = function(wall){
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
    
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
          return false;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {
          const pt = createVector();
          pt.x = x1 + t * (x2 - x1);
          pt.y = y1 + t * (y2 - y1);
          return pt;
        } else {
          return false;
        }

    }
  }
  
  let walls = [];
  function setup() {
    createCanvas(400, 400);

    // 1 let's add new walls
    for (let i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));

    background(0)
  }
  
  function draw() {
    background(0);
    fill(0,255,0);
    circle(mouseX, mouseY, 4);
    // draw them
    for (let wall of walls) {
        wall.show();
    }

    // they follow the mouse and they point in all the directions
    let rays = makeRays();
    for (let ray of rays) {
        ray.show();
    }
  }


  function makeRays(){
    //2 
    let pos = createVector(mouseX, mouseY);
    let rays = [];
    for (let a = 0; a < 360; a += 1) {
      let dir = p5.Vector.fromAngle(a);
      rays.push(new Ray(pos, dir));
    }   
    return rays;
    // we could speed up this, and simply update pos and dir of the rays
  }

