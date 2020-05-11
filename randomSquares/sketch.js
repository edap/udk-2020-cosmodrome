// credits to https://generativeartistry.com/tutorials/piet-mondrian/
const white = '#F2F5F1';
const size = 400;
const squares = [{
  x: 0,
  y: 0,
  width: size,
  height: size,
  color: "#FFFFFF"
}];

function drawSquares(squares) {
  squares.forEach(sq => {
    fill(sq.color);
    rect(sq.x, sq.y, sq.width, sq.height);
  });
}

function splitOnX(square, squares, splitAt) {
  const squareA = {
    x: square.x,
    y: square.y,
    width: square.width - (square.width - splitAt + square.x),
    height: square.height,
    color: white
  };

  const squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height,
    color: white
  }

  squares.push(squareA);
  squares.push(squareB);
};

function splitOnY(square, squares, splitAt) {
  const squareA = {
    x: square.x,
    y: square.y,
    height: square.height - (square.height - splitAt + square.y),
    width: square.width,
    color: white
  };

  const squareB = {
    x: square.x,
    y: splitAt,
    height: square.height - splitAt + square.y,
    width: square.width,
    color: white
  }

  squares.push(squareA);
  squares.push(squareB);
};

function splitSquares(coordinates, squares) {
  const {
    x,
    y
  } = coordinates;
  for (let i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];
    // split the square
    if (x && x > square.x && x < square.x + square.width) {
      if(Math.random() > 0.5){
        squares.splice(i, 1);
        splitOnX(square, squares, x);
      }
    }
    if (y && y > square.y && y < square.y + square.height) {
      if(Math.random() > 0.5){
        squares.splice(i, 1);
        splitOnY(square, squares, y);
      }
    }
  }
}

function setup() {
  noLoop();
  createCanvas(size, size);
}

function draw() {
  background(220);
  const step = size / 20;

  for(let i = 0; i < size; i+= step){
    splitSquares({x: i}, squares);
    splitSquares({y: i}, squares);
  }

  const colors = ['#D40920', '#FFFF22', '#4322FF'];
  for(let i = 0; i< squares.length; i++){
    if(Math.random() > 0.1){
      let indexColor = int(random(3));
      squares[i].color = colors[indexColor];
    }
  }

  drawSquares(squares);
}
