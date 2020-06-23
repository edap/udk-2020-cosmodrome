// Now, our checkneighoubour func is giving us back a neighbor that has not been visited yet, if there is one.

function index(i, j){
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;    
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
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
    // let's see slowly what is going on
    frameRate(2);
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
    // save the neighbor in the var next. This is the next free cell around the current cell
    let next = current.checkNeighbors();

    // as long as there is a next free neighbor close to the current, my algorithm should continue working/
    // try it now, we have a loop!
    if (next) {
        next.visited = true;
        current = next;
      }
  
  }