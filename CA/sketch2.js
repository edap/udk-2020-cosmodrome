// let's change the initial state of the grid with just one cell turned on in the middle
// and with the dimension of the grid depending on the width of the cell


// How the initial state affect the composition?
// which rules can you imagine?
// which role could color play in this simulation

let cells;
let cell_side = 2;
let generation = 0;
let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];


// maximum 256 rules    
// https://plato.stanford.edu/entries/cellular-automata/supplement.html
// https://en.wikipedia.org/wiki/Rule_30
//ruleset = [0, 0, 0, 1, 1, 1, 1, 0];



function setup() {
  createCanvas(800, 800);
  background(0)
  //frameRate(1); // remove this line
  let ncells = floor(width/cell_side);
  cells = new Array(ncells).fill().map(i => 0); // we did this initialization with the map function in the last lesson
  cells[cells.length/2] = 1;
  // cells[cells.length/4] = 1;
  // cells[3*cells.length/4] = 1;

  console.log(cells);
}

function draw() {
  // what if we make more iterations, like 100?
  if (generation < 800) {
    generate();
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] == 0) fill(255);
      else fill(0);
  
      stroke(0);
      rect(i*cell_side, generation*cell_side, cell_side, cell_side);
    }

  }

}

function generate(){
  let nextgen = new Array(cells.length);
  for (let i = 1; i < cells.length-1; i++) {
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

