// Now the loop. Out animation will continue until all the cell has been visited.
// Does the cell have a neighbour that has not beeing visited? this is our first problem


// this function simply gives me back the indec for each cell
function index(i, j){
    // then, let' invalidate the cell out of the border
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }

    // first just this
    return i + j * cols;    
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  
    // this is the place where we check the neighbours.
    // each cell has 4 neighbours
    this.checkNeighbors = function() {
      let neighbors = [];
  
      // those are our neighbours
      let top = grid[index(i, j - 1)]; // show this on the board, then introduce the index function
      let right = grid[index(i + 1, j)];
      let bottom = grid[index(i, j + 1)];
      let left = grid[index(i - 1, j)];
  
    // first do it like this
    //   if (!top.visited) {
    //     neighbors.push(top);
    //   }
    //   if (!right.visited) {
    //     neighbors.push(right);
    //   }
    //   if (!bottom.visited) {
    //     neighbors.push(bottom);
    //   }
    //   if (!left.visited) {
    //     neighbors.push(left);
    //   }

    
      // then like this. the check for top, right bot and left in the condition, it is needed to adress
      // the case when we are on the border, and maybe there is no a top, a bottom, a left and a right.
      // lets modify the index function
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
  
      // and in this part we decide where to go. Simply pick randomly one of the cell
      // that was not visited yet, that we have saved in the neighbours array.
      if (neighbors.length > 0) {
        let r = floor(random(0, neighbors.length));
        return neighbors[r];
      } else {
        return undefined;
      }
    };

  
    // each cell draw itself by drawning its walls
    this.show = function() {
      let x = this.i * w;
      let y = this.j * w;
      stroke(255);
      // now let's draw just the walls just if they are open
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
  
      // let's make visible if a cell has been visible or not
      if (this.visited) {
        noStroke();
        fill(255, 0, 255, 100);
        rect(x, y, w, w);
      }
    };
  }
  
  
  // This variable will save the cell currently being visited. It is our cursor
  let current;
  let cols, rows;
  let w = 40;
  let grid = [];
  
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
  
    // we start assuming that the first cell is the beginning of our journey
    current = grid[0];
    background(0)
  }
  
  function draw() {
    background(51);

    for (let i = 0; i < grid.length; i++) {
      grid[i].show();
    }

    current.visited = true;
    current.checkNeighbors();
  
  }