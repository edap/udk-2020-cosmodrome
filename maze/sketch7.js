// Now there is another problem, it get stopped. It needs to go all the way back through the visited cell (this is the backtracking part of the algorithm),
// and branch out somewhere else

function index(i, j){
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;    
}

//
function removeWalls(a, b) {
    let x = a.i - b.i;
    if (x === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (x === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }

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
  let stack = []; // what is the stack? is a term from computer science. Is like an array, it is a list of things one of the top of each other.
  // things are getting pushed on the top of the stack. push!
  // when take things out, you take them from the top of the pile, meaning the last item added. pop! The last thing in, is the first thing out
  
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

        // STEP 2
        // check the wiki page! simply push things in
        stack.push(current);

        // step 3, remove walls
        removeWalls(current, next);

        // step 4 in the wiki page
        current = next;
    // here is where the magic happen. If there is no an available free neighbor,
    // we check if our stack it is not empty. If it is not, we take the last cell cell insert as our new current cursor.
    // We are done!!
    } else if (stack.length > 0) {
        current = stack.pop();
    }
  
  }

  // how about changing the colors depending on how many time they get visited
  // what about adding horizzontal or vertical bias?