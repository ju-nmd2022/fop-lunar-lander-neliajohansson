function setup() {
  createCanvas(700, 700);
}

let mouseIsClicked = false;
let x = 0;
let y = 0;
let leftRight = 0;
let maxVelocity = 0.5;
let down = 1;
let up = 0.3;
let isGameActive = true;

let starX = [];
let starY = [];
let starAlpha = [];

//Rocket
function rocket() {
  push();
  translate(x, y);
  noStroke();

  // Rocket body
  fill(255, 180, 190);
  rect(200, 200, 50, 80);

  //Rocket enging
  fill(85, 118, 209);
  quad(200, 280, 250, 280, 235, 290, 215, 290);

  // Rocket nose cone
  fill(222, 49, 99);
  triangle(200, 200, 250, 200, 225, 160);

  // Rocket left wing
  quad(190, 260, 200, 250, 200, 280, 190, 300);

  // Rocket right wing
  quad(250, 250, 260, 260, 260, 300, 250, 280);

  // Rocket window
  fill(166, 144, 223);
  stroke(50, 50, 50);
  strokeWeight(3);
  ellipse(225, 225, 25, [25]);
  pop();

  // Rocket movement
  if (isGameActive) {
    y = y + up;
    up = up + 0.1;
    y = y + down;
  }

  if (keyIsDown(32)) {
    up = up - 0.3;
  }
}

// Scenery
function scenery() {
  noStroke();
  fill(48, 25, 52);
  rect(0, 0, width, height);
}

for (let i = 0; i < 1000; i++) {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  const alpha = Math.random();

  starX.push(x);
  starY.push(y);
  starAlpha.push(alpha);
}

function scenery() {
  noStroke();
  background(48, 25, 52);
  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 1);
    starAlpha[index] = starAlpha[index] + 0.02;
  }
  fill(0, 188, 228);
  rect(0, 600, width, 100);

  stroke(0, 210, 260);
  strokeWeight(3);
  fill(10, 150, 200);
  ellipse(80, 650, 130, [30]);
  ellipse(500, 670, 100, [30]);
  ellipse(250, 620, 80, [10]);
  ellipse(600, 630, 70, [20]);
  ellipse(350, 640, 50, [10]);
  ellipse(500, 630, 60, [10]);
  ellipse(200, 680, 70, [15]);
  ellipse(660, 660, 50, [10]);
}

function draw() {
  scenery();
  rocket(100, 100);
}

// Start screen
function startScreen() {
  background(48, 25, 52);
  fill(255, 255, 255);
  noStroke();
  textSize(30);
  textFont("Futura");
  text("Lunar Lander", 258, 200);
  textSize(15);
  textFont("Futura");
  text("Click anywhere on the screen to start the game!", 186, 300);
}

// Game screen
function gameScreen() {
  scenery();
  rocket();
}

// Result screen
function resultScreen() {
  background(48, 25, 52);
  fill(255, 255, 255);
  noStroke();
  textSize(30);
  textFont("Futura");
  text("Result", 308, 200);
  textSize(15);
  textFont("Futura");
  text("Click anywhere on the screen to restart the game!", 180, 400);
}

let state = "start";
let gameTimer = 0;

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
    gameTimer = gameTimer + 0.2;
    if (gameTimer >= 100) {
      gameTimer = 0;
      state = "result";
    }
  } else if (state === "result") {
    resultScreen();
  }
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "result") {
    state = "game";
  }
}

if (mouseIsClicked);
{
  gameScreen();
  isGameActive = true;
}
