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
var gameLogo = new Image();
var startButton = new Image();
var gameOverImg = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
soundOnIcon.src = "images/audioOn.png";
soundOffIcon.src = "images/audioOff.png";
gameLogo.src = "images/flappyBirdLogo.png";
startButton.src = "images/startButton.png";
gameOverImg.src = "images/gameOver.png";
// some variables

var gap = 140;
var constant;

var bX = 10;
var bY = 150;

var gravity = 0.8;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// game states and init
var gameStates = { START: 1, PLAYING: 2, GAMEOVER: 3 ,CURRENT:1};
var gameState = gameStates.START;

var score = 0;
var soundOn = false;
// EVENTS

// on key down

function moveUp() {
  bY -= 40;
  gravity = 0.8;
  if (soundOn) {
    fly.play();
  }
}
// audio icon click

cvs.addEventListener("click", (e) => enableDisableSound(e));
function enableDisableSound(e) {
  var offsetX = e.x - cvs.offsetLeft;
  var offsetY = e.y - cvs.offsetTop;
  if (offsetX > 21 && offsetX < 35 && offsetY > 26 && offsetY < 45) {
    soundOn = !soundOn;
  }
}
//start button click
cvs.addEventListener("click", (e) => handleStarBtnClick(e));
function handleStarBtnClick(e) {
  if (gameStates.CURRENT==gameStates.START) {
    var offsetX = e.x - cvs.offsetLeft;
    var offsetY = e.y - cvs.offsetTop;
    if (
      offsetX > 43 &&
      offsetX < 43 + startButton.width &&
      offsetY > 302 &&
      offsetY < 302 + startButton.height
    ) {
      console.log("start");
      gameState = gameStates.PLAYING;
      soundOn = true;
    }
  }
}

// pipe coordinates

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

// draw images

function draw() {
  switch (gameState) {
    case gameStates.START:
      gameStates.CURRENT=gameStates.START;
      ctx.fillStyle = "cyan";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.drawImage(bg, 0, 0);
      ctx.drawImage(startButton, 40, 300);

      break;
    case gameStates.PLAYING:
      gameStates.CURRENT=gameStates.PLAYING;
      ctx.drawImage(bg, 0, 0);

      for (var i = 0; i < pipe.length; i++) {
        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x -= 1;

        if (pipe[i].x == 50) {
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
          //game over
          gameState = gameStates.GAMEOVER;
        }

        if (pipe[i].x == 5) {
          score++;
          if (soundOn) scor.play();
        }
      }

      ctx.drawImage(fg, 0, cvs.height - fg.height);

      ctx.drawImage(bird, bX, bY);

      bY += gravity;
      gravity += 0.008;

      ctx.fillStyle = "#000";
      ctx.font = "20px Verdana";
      ctx.fillText("Score : " + score, 10, cvs.height - 20);

      // draw sound icon
      if (soundOn) {
        ctx.drawImage(soundOnIcon, 20, 20);
      } else {
        ctx.drawImage(soundOffIcon, 19, 21);
      }
      break;
    case gameStates.GAMEOVER:
      gameStates.CURRENT=gameStates.GAMEOVER;
      ctx.drawImage(bg, 0, 0);
      ctx.drawImage(gameOverImg, 50, 60);
      ctx.fillStyle = "#000";
      ctx.font = "40px Verdana";
      ctx.fillText("Score : " + score, 50, cvs.height - 50);
      soundOn = false;
      break;
    default:
      console.log("defaulted");
      break;
  }
  requestAnimationFrame(draw);
}

draw();
