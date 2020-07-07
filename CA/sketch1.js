// Now we need a mechanism by which to compute the next generation, that tells how the grid should evolve
// For every cell in the array:

// Take a look at the neighborhood states: left, middle, right.

// Look up the new value for the cell state according to some ruleset. We will define our own rules

// Set the cell’s state to that new value.


let cells = [1,0,1,0,0,0,0,1,0,1,1,1,0,0,0,1,1,1,0,0];
let cell_side = 40;
let generation = 0;

// a 3x3 grid
let ruleset = [0,1,0,1,1,0,1,0];



function setup() {
  createCanvas(800, 800);
  background(0)
  frameRate(1);
}

function draw() {
  // avoid infinite loop
  if (generation < 10) {
    generate();
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] == 0) fill(255);
      else fill(0);
  
      stroke(0);
      //rect(i*cell_side,0,cell_side,cell_side);
      // we do not clean the screen, we simply draw after
      rect(i*cell_side, generation*cell_side, cell_side, cell_side);
    }

  }

}

function generate(){
  // we save here the next state
  let nextgen = new Array(cells.length);
  for (let i = 1; i < cells.length-1; i++) { // a loop that does not consider the first and last cell
    let left   = cells[i-1];
    let me     = cells[i];
    let right  = cells[i+1];
    nextgen[i] = rules(left, me, right);
  }
  cells = nextgen;
  generation++;
}



function rules (a, b, c) {
  if      (a == 1 && b == 1 && c == 1) return ruleset[0];
  else if (a == 1 && b == 1 && c == 0) return ruleset[1];
  else if (a == 1 && b == 0 && c == 1) return ruleset[2];
  else if (a == 1 && b == 0 && c == 0) return ruleset[3];
  else if (a == 0 && b == 1 && c == 1) return ruleset[4];
  else if (a == 0 && b == 1 && c == 0) return ruleset[5];
  else if (a == 0 && b == 0 && c == 1) return ruleset[6];
  else if (a == 0 && b == 0 && c == 0) return ruleset[7];
}

