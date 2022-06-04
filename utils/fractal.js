const TILT = 1/27; // to be set 1/27, 2/27/, 3/27
const DEPTH = 3; // to be set 1, 2, or 3

function setup() {
  const size = min(windowWidth, windowHeight);
  var canvas = createCanvas(size, size);
  canvas.parent('sketch-holder');
  colorMode(HSL, 1);
}

function draw() {
  scale(width, height);
  background(0);
  stroke(1);
  strokeWeight(0.0005);

  drawFractal(0.5, 0.5, 0.4, DEPTH);
}

function polar(angle, radius) {
  return {
    x: cos(angle * PI * 2) * radius,
    y: sin(angle * PI * 2) * radius,
  }
}

function drawFractal(x, y, size, depth) {
  for (let i = 0; i < 9; i++) {
    const f = i / 9;
    const angle = f + TILT;
    
    if (depth > 0) {
      const scale = 0.5;
      const s = size * scale;
      const p = polar(angle, s);
      drawFractal(x + p.x, y + p.y, s, depth - 1);
    } else {
      const p1 = polar(angle, size);
      const p2 = polar(angle + 4/9, size);
      line(x + p1.x, y + p1.y, x + p2.x, y + p2.y);
    }
  }
}