// Let's make things visible
let sandpiles;
let nextpiles;
let defaultColor = [255, 0, 0];
let colors = [
  [255, 255, 0],
  [0, 185, 63],
  [0, 104, 255],
  [122, 0, 229]
];
 
function setup() {
  createCanvas(200, 200); // make a big canvas
  pixelDensity(1);
  sandpiles = new Array(width).fill().map(i => new Array(height).fill(0));
  nextpiles = new Array(width).fill().map(i => new Array(height).fill(0));
  
  sandpiles[width / 2][height / 2] = 100000; // add more sand
  background(defaultColor[0], defaultColor[1], defaultColor[2]);
}




function topple() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      nextpiles[x][y] = sandpiles[x][y];
    }
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpiles[x][y];
      if (num >= 4) {
        nextpiles[x][y] -= 4;
        if (x + 1 < width) nextpiles[x + 1][y]++;
        if (x - 1 >= 0) nextpiles[x - 1][y]++;
        if (y + 1 < height) nextpiles[x][y + 1]++;
        if (y - 1 >= 0) nextpiles[x][y - 1]++;
      }
    }
  }

  let tmp = sandpiles;
  sandpiles = nextpiles;
  nextpiles = tmp;
}

function render(){
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpiles[x][y];
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

      let pix = (x + y * width) * 4;
      pixels[pix] = col[0];
      pixels[pix + 1] = col[1];
      pixels[pix + 2] = col[2];
    }
  }
  updatePixels();

}

function draw() {
  // remove the noLoop, decrease the frame rate
  frameRate(1);
  render();
  topple();
}