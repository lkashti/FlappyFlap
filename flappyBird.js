var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var soundOnIcon = new Image();
var soundOffIcon = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
soundOnIcon.src = "images/audioOn.png";
soundOffIcon.src = "images/audioOff.png";

// some variables

var gap = 125;
var constant;

var bX = 10;
var bY = 150;

var gravity = 0.8;

var score = 0;
var soundOn = true;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// EVENTS
// on key down

function moveUp() {
  bY -= 40;
  if (soundOn) {
    fly.play();
  }
}
// audio icon press
cvs.addEventListener("click", (e) => {
  if (e.x > 1157 && e.x < 1184 && e.y > 33 && e.y < 56) {
    soundOn = !soundOn;
  }
});

// pipe coordinates

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

// draw images

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x -= 0.5;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    // detect collision

    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 5) {
      score++;
      if (soundOn) scor.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  // draw sound icon
  if (soundOn) {
    ctx.drawImage(soundOnIcon, 20, 20);
  } else {
    ctx.drawImage(soundOffIcon, 19, 21);
  }

  requestAnimationFrame(draw);
}

draw();
