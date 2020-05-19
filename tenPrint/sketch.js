// https://10print.org/
// Credits for this code goes to Daniel Shiffman https://www.youtube.com/watch?v=bEyTZ5ZZxZs

// 1 Random
// 2 x and y as global var. Try increase x
// 3 put the 10 in a var. Look at the print10
// original, think about how to grow the y
// 4. Change probability, change form, change color
// make your own function to call, passing the x, y and space parameters.

// Examples:
// with perlin noise https://codepen.io/RedHenDev/pen/OxOZWM
// Overlapping functions https://codepen.io/anon/pen/jGLRax
// with wind https://www.rand-on.com/projects/2017_10PRINT/windy_10_print.html
// morse https://editor.p5js.org/haideralipunjabi/present/3Cyk8OOvR

//2
let y = 0;
let x = 0;

// 3 
let space = 10;

function setup() {
  createCanvas(400, 400);
  background(0)
}

function draw() {
  stroke(255);

  // 1 
  // if(random(1) < 0.5){
  //   line(0,0,10,10);
  // }else{
  //   line(0,10,10,0);   
  // }

  // 2
  // if (random(1) < 0.5) {
  //   line(x, y, x + 10, y + 10);
  // } else {
  //   line(x, y + 10, x + 10, y);   
  // }
  // x+= 10;


  if (random(1) < 0.5) {
    line(x, y, x + space, y + space);
  } else {
    line(x, y + space, x + space, y);   
  }
  x+= 10;

  // y += 10; ? no, why not, what do we want and how could we achive it?
  //
  if(x > width){
    x = 0;
    y = y + space;
  }

  if(y > height){
    noLoop();
  }

}