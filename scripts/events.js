export function enableDisableSound(e) {
  var offsetX = e.x - cvs.offsetLeft;
  var offsetY = e.y - cvs.offsetTop;
  if (offsetX > 21 && offsetX < 35 && offsetY > 26 && offsetY < 45) {
    soundOn = !soundOn;
  }
}
export function handleStarBtnClick(e) {
  if (gameStates.CURRENT != gameStates.PLAYING) {
    gameStates.CURRENT = gameStates.START;
    score = 0;
    bY = 150;
    pipe = [];
    pipe.push({ x: cvs.width, y: 0 });

    pipe[0] = {
      x: cvs.width,
      y: 0,
    };
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
