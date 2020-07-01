// https://10print.org/
// Credits https://thecodingtrain.com/CodingChallenges/107-sandpiles.html

// Again. Divide a space into a cell. We will focus on a 3x3 cell
// the idea is that each cell inside a 3x3 grid has sand, 
// the maximum number of grain of sand is 3.
// What happen if put a grain of sand in one cell that already has 3?
// the grain of sand is spread to norht, souht, eas and west
// so
// 0 0 0
// 0 4 0
// 0 0 0

// becomes
// 0 1 0
// 1 0 1
// 0 1 0

// the same happens for a grid that is
// 1 2 0
// 2 4 1
// 0 0 2

// it becomes
// 1 3 0
// 3 3 2
// 0 1 2
let sandpiles;
let defaultColor = [255, 0, 0];
let colors = [
  [255, 255, 0],
  [0, 185, 63],
  [0, 104, 255],
  [122, 0, 229]
];
 
function setup() {
  // 2D array
  createCanvas(6, 6);
  sandpiles = new Array(width).fill().map(i => new Array(height).fill(0));
  background(defaultColor[0], defaultColor[1], defaultColor[2]);
}

function render(){
  loadPixels(); // means: hey computer, give me all the pixels inside the canvas
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpiles[x][y]; // how much sand in each cell?
      // pixels are saved in a one dim array, to get the index knowing x and y
      // we do x+w*width
      // the color depends on how much sand is in it
      let col = defaultColor;
      if (num == 0) {
        col = colors[0];
      } else if (num == 1) {
        col = colors[1];
      } else if (num == 2) {
        col = colors[2];
      } else if (num == 3) {
        col = colors[3];
      }
      // each pixel on the screen has 4 values. R, G, B and alpha. That's why the * 4
      let index = (x + y*width)  * 4;
      pixels[index] =  col[0];
      pixels[index + 1] =  col[1];
      pixels[index + 2] =  col[2];
    }
  }
  updatePixels(); // means: hey computer, refresh all the pixels inside the canvas with the new value inside the pixels array
}

function draw() {
  render();
  noLoop();
}
