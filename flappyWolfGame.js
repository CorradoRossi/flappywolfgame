let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let rules = document.getElementById("rules");

// load images

let sheep = new Image();
let background = new Image();
let farmerVertical = new Image();
let farmer = new Image();

sheep.src = "images/sheep_lg.png";
background.src = "images/points1.gif";
farmerVertical.src = "images/farmer_vert_thin.png";
farmer.src = "images/farmer_thin.png";

// some letiables

let gap = 155;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1.5;

let score = 0;

// audio files

let fly = new Audio();
let scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 13 || e.keyCode == 32) {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  }
});

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      moveLeft();
      break;
    case 38:
      moveUp();
      break;
    case 39:
      moveRight();
      break;
    case 40:
      moveDown();
      break;
  }
});

function moveUp() {
  bY -= 25;
  fly.play();
}

function moveRight() {
  bX += 25;
  fly.play();
}

function moveDown() {
  bY += 25;
  fly.play();
}

function moveLeft() {
  bX -= 25;
  fly.play();
}

// pipe coordinates

let pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0,
};

// draw images

let isRunning = false;

function start() {
  isRunning = true;
  rules.remove();
  draw();
}

function stop() {
  isRunning = false;
}

function draw() {
  if (!isRunning) return;
  context.drawImage(background, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    constant = farmerVertical.height + gap;
    context.drawImage(farmerVertical, pipe[i].x, pipe[i].y);
    context.drawImage(farmer, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y:
          Math.floor(Math.random() * farmerVertical.height) -
          farmerVertical.height,
      });
    }

    // detect collision

    if (
      (bX + sheep.width >= pipe[i].x &&
        bX <= pipe[i].x + farmerVertical.width &&
        (bY <= pipe[i].y + farmerVertical.height ||
          bY + sheep.height >= pipe[i].y + constant)) ||
      bY + sheep.height >= canvas.height - 50
    ) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }

  context.drawImage(sheep, bX, bY);

  bY += gravity;

  context.fillStyle = "#fff";
  context.font = "20px Verdana";
  context.fillText("Score : " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

draw();
