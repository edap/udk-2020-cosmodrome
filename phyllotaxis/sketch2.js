const max_number_of_points = 4800;
let n = 0;
const c = 5;
let start = 0;

function setup(){
  createCanvas(800, 800);
  colorMode(HSB);
  angleMode(DEGREES);
  background(25, 204, 100);
}

function draw() {
  translate(width / 2, height / 2);
  let i;
  for (i = 0; i < n; i++){
    // start = 0;
    // Algorithm!
    let a = i * 137.5;
    let r = c * sqrt(i);

    // conversion from polar coordinates system to cartesian coordinates
    let x = r * cos(a);
    let y = r * sin(a);

    // 1
    let hue = sin(start+ i * 0.5);
    hue = map(hue, -1, 1, 0, 255);
    // fill(a%255, 255, 255);
    fill(hue, 255, 255);
    ellipse(x, y, 4,4);
    noStroke();
  }
  if (i < max_number_of_points) {
    n+= 5;
    start+= 5;
  }
}