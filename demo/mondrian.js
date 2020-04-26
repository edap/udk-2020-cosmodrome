// credits to https://generativeartistry.com/tutorials/piet-mondrian/
const canvasSketch = require('canvas-sketch');
const p5 = require('p5');


// 1) Create a squares array, create a function that draw it
// 2) Draw a big sqaure on the scrin. Now we are going to split it
// 3) splitSquaresWith. Have a look at what splice does https://www.w3schools.com/jsref/jsref_splice.asp
// While are we iterating backward?
// 4) call it 2 times and see what happens
// 5) steps, make a loop
// 6) Split randomly: add use the function splitSquaresRandomlyWith instead of splitSquaresWith.
// 7) Colors
// 8 exercises


const preload = p5 => {
  // You can use p5.loadImage() here, etc...
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: true
};


const white = '#F2F5F1';
const drawSquares = (p5, squares) => {
  squares.forEach(square => {
    p5.fill(square.color);
    p5.rect(square.x, square.y, square.width, square.height);
  });
}


const splitSquaresRandomlyWith = (coordinates, squares) => {
  const { x, y } = coordinates;
  for (let i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];
    if (x && x > square.x && x < square.x + square.width) {
      if(Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnX(square, squares, x);
      }
    }

    if (y && y > square.y && y < square.y + square.height) {
      if(Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnY(square, squares, y);
      }
    }
  }
}


const  splitSquaresWith = (coordinates, squares) => {
  const { x, y } = coordinates;
  for (let i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];
    if (x && x > square.x && x < square.x + square.width) {
      squares.splice(i, 1);
      splitOnX(square, squares, x);
    }

    if (y && y > square.y && y < square.y + square.height) {
      squares.splice(i, 1);
      splitOnY(square, squares, y);
    }
  }
}

const splitOnX = (square, squares, splitAt) => {
  // Create two new squares, based on
  // splitting the given one at the
  // x coordinate given
  const squareA = {
    x: square.x,
    y: square.y,
    width: square.width - (square.width - splitAt + square.x),
    height: square.height,
    color:white,
  };

  const squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height,
    color: white,
  };

  squares.push(squareA);
  squares.push(squareB);
}

const splitOnY = (square, squares, splitAt) => {
  const squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - splitAt + square.y),
    color: white,
  };
  
  const squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt + square.y,
    color: white,
  };
  
  squares.push(squareA);
  squares.push(squareB);
}

canvasSketch(() => {
  // Inside this is a bit like p5.js 'setup' function
  const size = window.innerWidth;
  const squares = [{
    x: 0,
    y: 0,
    width: size,
    height: size,
    color: white
  }];
  // 4) call it 2 times and see what happens
  // splitSquaresWith({x: 160}, squares)
  // splitSquaresWith({y: 160}, squares)

  // 5) Try steps!
  // const step = size / 6;
  // for (let i = 0; i < size; i += step) {
  //   splitSquaresWith({ y: i }, squares);
  //   splitSquaresWith({ x: i }, squares);
  // }

  // 6) Add randomness
  // const step = size / 6;
  // for (let i = 0; i < size; i += step) {
  //   splitSquaresRandomlyWith({ y: i }, squares);
  //   splitSquaresRandomlyWith({ x: i }, squares);
  // }

  // 7 add colors
  // const colors = ['#D40920', '#1356A2', '#F7D842']
  // for (var i = 0; i < colors.length; i++) {
  //   squares[Math.floor(Math.random() * squares.length)].color = colors[i];
  // }

  //8 Exercises:
  // How can you make the sketch more colored?
  // How can you draw more squares, simply changing one number?

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    drawSquares(p5, squares);
  };
}, settings);
