function setup(){
    createCanvas(800, 800);
    colorMode(HSB);
    angleMode(DEGREES); // angles can be in radians or degree
    noLoop();
    background(25, 204, 100);
    }
  
function draw() {
    translate(width / 2, height / 2);
    let HoursInAClock = 12;
    let anglePerHour = 360 / HoursInAClock;
    for (let i = 0; i < HoursInAClock; i++){
        let a = anglePerHour * i;
        let r = 300;

        // conversion from polar coordinates system to cartesian coordinates
        let x = r * cos(a);
        let y = r * sin(a);

        noStroke();
        fill(100, 255, 255);
        ellipse(x, y, 40,40);
    }
}