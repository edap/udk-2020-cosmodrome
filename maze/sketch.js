// Credits to Daniel Shiffman: https://www.youtube.com/watch?v=HyK_Q5rrcr4&feature=emb_title
// https://thecodingtrain.com/CodingChallenges/010.1-maze-dfs-p5.html
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Depth-First_Search

// Build a grid made out of cell.
// The program is simply trying to figure out which wall should be remove for each cell
// Let's start with a Cell class
// Each grid should be able to find its neighbours, it should be able to know it its wall are open or closed, and it should be able to know where it is


// i column number, j is the row number
function Cell(i, j) {
  this.i = i;
  this.j = j;

  // each cell draw itself by drawning its walls
  this.show = function() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);

    line(x, y, x + w, y);
    line(x + w, y, x + w, y + w);
    line(x + w, y + w, x, y + w);
    line(x, y + w, x, y);

  };
}



// How big is our grid? let's define columns and rows number, and let's decide how big is each cell, w variable
let cols, rows;
let w = 40;
let grid = []; // this is a container where we store all the cell

function setup() {
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);

  // let's create the cell object and put it in the grid
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  background(0)
}

function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

}