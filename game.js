function setup() {
  createCanvas(700, 700);

  for (let i = 0; i < 1000; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const alpha = Math.random();
    starX.push(x);
    starY.push(y);
    starAlpha.push(alpha);
  }
}

let buttonIsClicked = false;
let state = "start";
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

// START SCREEN
function startScreen() {
  background(48, 25, 52);
  fill(255, 255, 255);
  noStroke();
  textSize(30);
  textFont("Futura");
  text("Lunar Lander", 258, 200);
  textSize(15);
  text(
    "Use arrow left & right to move the rocket from side to side,",
    155,
    280
  );
  text("and the space key to control the velocity,", 209, 310);
  text("to safely land the rocket on the moon.", 217, 340);

  // Play button
  fill(255, 255, 255);
  noStroke();
  rect(275, 400, 150, 50);
  fill(0, 0, 0);
  textSize(15);
  text("PLAY GAME", 307, 430);

  if (buttonIsClicked) {
    gameScreen();
    isGameActive = true;
  }
}

function mousePressed() {
  if (mouseX > 275 && mouseX < 275 + 150 && mouseY > 400 && mouseY < 400 + 50) {
    state = "game";
  }
}

// GAME OVER SCREEN
function gameoverScreen() {
  background(48, 25, 52);
  fill(255, 255, 255);
  noStroke();

  push();
  textSize(30);
  textFont("Futura");
  text("Game Over", 268, 220);
  pop();

  push();
  fill(255, 255, 255);
  rect(275, 400, 150, 50);
  fill(0, 0, 0);
  textSize(15);
  textFont("Futura");
  text("PLAY AGAIN", 305, 430);
  pop();

  if (buttonIsClicked) {
    gameScreen();
    isGameActive = true;
  }
}

// WINNER SCREEN
function winnerScreen() {
  background(48, 25, 52);
  fill(255, 255, 255);
  noStroke();

  push();
  textSize(30);
  textFont("Futura");
  text("You Won!", 280, 220);
  pop();

  push();
  fill(255, 255, 255);
  rect(275, 400, 150, 50);
  fill(0, 0, 0);
  textSize(15);
  textFont("Futura");
  text("PLAY AGAIN", 305, 430);
  pop();

  if (buttonIsClicked) {
    gameScreen();
    isGameActive = true;
  }
}

// GAME SCREEN
function gameScreen() {
  rocket();
  background(48, 25, 52);
  noStroke();

  for (let index in starX) {
    fill(255, 255, 255, Math.abs(Math.sin(starAlpha[index])) * 255);
    ellipse(starX[index], starY[index], 1);
    starAlpha[index] = starAlpha[index] + 0.02;
  }

  push();
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
  pop();
}

// ROCKET
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
    x = x + leftRight;
    y = y + down;
  }

  if (keyIsDown(39)) {
    leftRight = 3;
  } else if (keyIsDown(37)) {
    leftRight = -3;
  } else {
    leftRight = 0;
  }
  if (keyIsDown(32)) {
    up = up - 0.3;
  }

  if (y >= 330 && up >= maxVelocity) {
    console.log("game over");
    isGameActive = false;
    gameoverScreen();
  }

  if (y >= 330 && up <= maxVelocity) {
    console.log("win");
    isGameActive = false;
    winnerScreen();
  }

  // Rocket movement limits
  if (x > 450) x = 449;
  if (x < -200) x = -199;
  if (y > 400) y = 399;
  if (y < -200) y = -199;
}

// Restart game
function reset() {
  isGameActive = true;
  x = 0;
  y = 0;
  speed = 0;
  maxVelocity = 3;
  down = 0.7;
  up = 0.3;
}

function draw() {
  if (
    mouseIsPressed &&
    mouseX > 275 &&
    mouseX < 275 + 150 &&
    mouseY &&
    mouseY > 400 &&
    mouseY < 400 + 50
  ) {
    console.log("pressed");
    gameScreen();
    reset();
    state = "game";
  }

  if (state === "start") {
    startScreen();
  } else if (state === "game over") {
    gameoverScreen();
  } else if (state === "game") {
    gameScreen();
    rocket();
  } else if (state === "win") {
    winnerScreen();
  }
}
