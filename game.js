let starX = [];
let starY = [];
let starAlpha = [];
let x = 200;

for (let i = 0; i < 1000; i++) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  const alpha = Math.random();

  starX.push(x);
  starY.push(y);
  starAlpha.push(alpha);
}

function draw() {
  noStroke();
  background(48, 25, 52);
  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 1);
    starAlpha[index] = starAlpha[index] + 0.02;
  }
}

// Rocket body
noStroke();
fill(0, 188, 228);
rect(x, x, 50, 80);

//Rocket enging
fill(85, 118, 209);
quad(x, x + 80, x + 50, x + 80, x + 35, x + 90, x + 15, x + 90);

// Rocket nose cone
fill(222, 49, 99);
triangle(x, x, x + 50, x, x + 25, x - 40);

// Rocket left wing
quad(x - 10, x + 60, x, x + 50, x, x + 80, x - 10, x + 100);

// Rocket right wing
quad(x + 50, x + 50, x + 60, x + 60, x + 60, x + 100, x + 50, x + 80);

// Rocket window
fill(166, 144, 223);
stroke(50, 50, 50);
strokeWeight(3);
ellipse(x + 25, x + 25, 25, [25]);
