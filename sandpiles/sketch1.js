// But nothing happens! our screen is red. Why? well, all the cell have the same value, 0
// Let's put some sand in the middle of the screen.

// Now, we have to think about the topple part, pouring sand in the cells
// we need a new sandpiles,that store all the moved sand grains, called nextpiles, and a topple function

let sandpiles;
let nextpiles; // same as sandpiles at the beginning
let defaultColor = [255, 0, 0];
let colors = [
  [255, 255, 0],
  [0, 185, 63],
  [0, 104, 255],
  [122, 0, 229]
];
 
function setup() {
  createCanvas(6, 6);
  pixelDensity(1);
  sandpiles = new Array(width).fill().map(i => new Array(height).fill(0));
  // 1 initialise it
  nextpiles = new Array(width).fill().map(i => new Array(height).fill(0));
  
  sandpiles[width / 2][height / 2] = 4; // sand
  background(defaultColor[0], defaultColor[1], defaultColor[2]);
}



function topple() {
  // 
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num  = sandpiles[x][y];
      // copy to the next pile of sand
      nextpiles[x][y] = sandpiles[x][y];
    }
  }

  // if it is bigger than four, move it to the neighbors
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let num = sandpiles[x][y];
      if (num >= 4) {
        // first
        nextpiles[x][y] -= 4;
        nextpiles[x + 1][y]++;
        nextpiles[x - 1][y]++;
        nextpiles[x][y + 1]++;
        nextpiles[x][y - 1]++;

        // then take care of the border
        // if (x + 1 < width) nextpiles[x + 1][y]++;
        // if (x - 1 >= 0) nextpiles[x - 1][y]++;
        // if (y + 1 < height) nextpiles[x][y + 1]++;
        // if (y - 1 >= 0) nextpiles[x][y - 1]++;
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
      // 1 spot the value in the console that is not default!
      // it is the grain that we pour into the grid!

      // with the topple function, the grain got spread to the neighbours
      console.log(col);

      let pix = (x + y * width) * 4;
      pixels[pix] = col[0];
      pixels[pix + 1] = col[1];
      pixels[pix + 2] = col[2];
    }
  }
  updatePixels();

}

function draw() {
  // 2 add topple and see how the neighbour change
  topple();
  render();
  noLoop();
}