function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  orbitControl();
  background(200, 100, 50);
  let nPoints = 150;
  let c = 10;
  normalMaterial();

  let z= 1;
  //translate(0,0,0);
  for(let n = 0; n < nPoints; n++){
    let angle = n * 137.5;
    let radius = c * sqrt(n);
    x = cos(angle) * radius;
    y = sin(angle) * radius;
    //z += 0.1;
    translate(x, y, z);
    sphere(6);
  }
}