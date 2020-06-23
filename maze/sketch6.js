// Now there is a problem, the cursor get stucked at a certain point, we should be able to remove the walls
// Check the wiki page https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
// we have done step 1 and 4. We need to do step 2 and 3

// We start form 3. Remove the walls. what are the "chosen cell"?

function index(i, j){
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;    
}

//
function removeWalls(a, b) {
    // to check if the two cells are adjacent, we confront
    // the i (col number) and y (row number). Is the difference is 1, or -1,
    // it means they are adjacent.
    // 45 - 46, for example
    // to remove a wall, you simply set the wall to false
    let x = a.i - b.i;
    // x is simply the difference between the 2 indexes

    // top, right, bottom, left => 0, 1, 2, 3 Keep this in mind
    if (x === 1) {
      // remove the left wall of a and the right wall of b
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (x === -1) {
      a.walls[1] = false; // the right wall of a
      b.walls[3] = false; // the left wall of b
    }

    // let's to the same thing for the walls top and bottom
    let y = a.j - b.j;
    if (y === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (y === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
  }

function Cell(i, j) {
    this.i = i;
    this.j = j;
    // top right bottom left
    this.walls = [true, true, true, true];

    // look closely at two cells close to each other with a wall in between. One is called Cell, the other one Neigh.
    // Two walls actually need to be removed. How I do identify them? Using the indexes https://youtu.be/8Ju_uxJ9v44?t=172
    // Cell i - Neig i = the result will tell us, if the wall is to the right or the left
    // example 45 = 46 = -1. If we have negative 1, it means that the cell has a neighbour to the rigth
    // 
    this.visited = false;
  
    this.checkNeighbors = function() {
      let neighbors = [];
  
      let top = grid[index(i, j - 1)];
      let right = grid[index(i + 1, j)];
      let bottom = grid[index(i, j + 1)];
      let left = grid[index(i - 1, j)];
  
      if (top && !top.visited) {
        neighbors.push(top);
      }
      if (right && !right.visited) {
        neighbors.push(right);
      }
      if (bottom && !bottom.visited) {
        neighbors.push(bottom);
      }
      if (left && !left.visited) {
        neighbors.push(left);
      }
  

      if (neighbors.length > 0) {
        let r = floor(random(0, neighbors.length));
        return neighbors[r];
      } else {
        return undefined;
      }
    };
    
    this.highlight = function() {
      let x = this.i * w;
      let y = this.j * w;
      noStroke();
      fill(0, 255, 0, 100);
      rect(x, y, w, w);
    };
  

    this.show = function() {
      let x = this.i * w;
      let y = this.j * w;
      stroke(255);

      if (this.walls[0]) {
        line(x, y, x + w, y);
      }
      if (this.walls[1]) {
        line(x + w, y, x + w, y + w);
      }
      if (this.walls[2]) {
        line(x + w, y + w, x, y + w);
      }
      if (this.walls[3]) {
        line(x, y + w, x, y);
      }
  

      if (this.visited) {
        noStroke();
        fill(255, 0, 255, 100);
        rect(x, y, w, w);
      }
    };
  }
  

  let current;
  let cols, rows;
  let w = 40;
  let grid = [];
  
  function setup() {
    createCanvas(400, 400);
    cols = floor(width / w);
    rows = floor(height / w);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        var cell = new Cell(i, j);
        grid.push(cell);
      }
    }

    current = grid[0];
    background(0)
  }
  
  function draw() {
    background(51);

    for (let i = 0; i < grid.length; i++) {
      grid[i].show();
    }

    current.visited = true;
    current.highlight(); // let's add a function that tells us where the cursor is.
    // step 1 in the wiki page. Pick a random neighbour and mark it as visie
    let next = current.checkNeighbors();

    if (next) {
        
        next.visited = true;

        // step 3, remove walls
        removeWalls(current, next);

        // step 4 in the wiki page
        current = next;
    }
  
  }