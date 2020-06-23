// Ok. At this point we ad an actor, we have tho think that there is a cursor, moving around in our grid
// that decides if a wall should be closed or open.
// As it wals, it should never go back to visit a cell that was already visited. We need a varible to keep track if a cell was visited or not

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    // each cell at the beginning is false. 
    this.visited = false;
  

  
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

    // and we also assume that the current cell has been visited. If I run the sketch now, the grid should be purple/
    current.visited = true;
  
  }