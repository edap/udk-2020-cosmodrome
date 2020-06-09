
// Now what we need to do is to add a method to the ray class, that can tell us
// if there is an intersection between the ray and the wall

function Boundary(x1,y1,x2,y2){
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  
    this.show = function(){
      stroke(255);
      line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
  
  function Ray(x,y){
    this.pos = createVector(x,y);
    this.dir = createVector(1,0);
    this.mag = 10;
  
    this.show = function(){
      stroke(255,0,0);
      push();
      translate(this.pos.x, this.pos.y);
      line(0,0, this.dir.x * this.mag , this.dir.y * this.mag);
      pop();
    }

    // this is a function that simply tells the ray to look at a certain
    // position
    this.lookAt = function(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
      }

    this.cast = function(wall){
        // AH! Math, line to line intersection
        // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

        // there are two values in the wiki page, t and u.
        // if both give me a result, than I can use them to calculate
        // the intersection point. Otherwise, there is no intersection

        // wiki: "The intersection point falls within the first line segment if 0.0 ≤ t ≤ 1.0, and it falls within the second line segment if 0.0 ≤ u ≤ 1.0. "

        // t refers to the first line segment
        // u refers to the second line segment

        // But, actually, the ray is not a segment, it is an infinite line that goes on both direction.
        // for u, it is eanough for me to know that i am on the positive side of the infinite line, and for positive I mean pointing towards the boundary.

        // I define the variable so that they are like in the formula on the wiki page
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
    
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        // get the denominator
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        // if the den it is zero, it means that the wall and the ray ara parallel
        // and that they will never intersect
        if (den == 0) {
          return;
        }

        // if not, lets calculate t
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        // now let's get u
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        // back to the first definition of the algorithm
        if (t > 0 && t < 1 && u > 0) {
          const pt = createVector();
          return true;
        } else {
          return;
        }

    }
  }
  
  let wall;
  let ray;
  function setup() {
    createCanvas(400, 400);
    wall = new Boundary(300,100, 300, 300);
    ray = new Ray(100,200);
    background(0)
  }
  
  function draw() {
    background(0);
    wall.show();
    ray.show();

    // let's orientate the ray towards the mouse
    ray.lookAt(mouseX, mouseY);

    // is there any intersection?
    let pt = ray.cast(wall);
    console.log(pt);

    // we do this later
    // if (pt) {
    //     fill(0, 255, 0);
    //     circle(pt.x, pt.y,8);
    // }


  }