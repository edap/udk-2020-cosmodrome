
// Now let's get that point.



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

    if (pt) {
        fill(0, 255, 0);
        circle(pt.x, pt.y,8);
    }


  }