let angle = 30;
let angleSlider;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  angleSlider = createSlider(0, 360, 30, 1);
}

function draw() {
  background(120);
  translate(width / 2, height);
  angle = angleSlider.value();
  fractal(200);
}

function drawLeaf(x, y) {
  noStroke();
  ellipse(x, y, 5, 15);
}

function fractal(len) {
  if (len < 2) {
    drawLeaf(0, 0);
    return;
  }

  stroke(255);
  strokeWeight(len * 0.03);
  line(0, 0, 0, -len);
  translate(0, -len);

  push();
  rotate(angle);
  fractal(len * 0.67);
  pop();

  push();
  rotate(-angle);
  fractal(len * 0.67);
  pop();
}
