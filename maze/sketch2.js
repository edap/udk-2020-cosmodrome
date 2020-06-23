// Now for each wall, we should find a way to decide to draw it just if it is closed.
// we create 4 boolean variable, for top, left, bottom and right

// i column number, j is the row number
function Cell(i, j) {
    this.i = i;
    this.j = j;
    // let's put those value in the array, and assume that they are all open
    this.walls = [true, true, true, true];

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
  
    //   if (this.visited) {
    //     noStroke();
    //     fill(255, 0, 255, 100);
    //     rect(x, y, w, w);
    //   }
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