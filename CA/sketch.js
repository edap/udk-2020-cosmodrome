// Wolfram elementary Cellular Automata
// a CA is a system for which:

// Main reference
//https://natureofcode.com/book/chapter-7-cellular-automata/


// 1) The cells live on a grid. (We’ll see examples in both one and two dimensions in this chapter, though a cellular automaton can exist in any finite number of dimensions.)

// 2) Each cell has a state. The number of state possibilities is typically finite. The simplest example has the two possibilities of 1 and 0 (otherwise referred to as “on” and “off” or “alive” and “dead”).

// 3) Each cell has a neighborhood. This can be defined in any number of ways, but it is typically a list of adjacent cells.


// “What is the simplest cellular automaton we can imagine?” A one dimensional array
// A one dimensional CA where the state cna be 0 or 1
// What it the possible set of rules for which the state change
// It is, again, everything based around a grid and its cells


let cells = [1,0,1,0,0,0,0,1,0,1,1,1,0,0,0,1,1,1,0,0];
let cell_side = 40;

function setup() {
  createCanvas(800, 800);
  background(0)
}

function draw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] == 0) fill(255);
    else fill(0);

    stroke(0);
    rect(i*cell_side,0,cell_side,cell_side);
  }

}