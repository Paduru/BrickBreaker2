var PLAY = 1;
var END = 0;

var gameState;

var backgroundImg;
var paddle;
var ball;
var tiles;
var startImg, restartImg, playButton;

function preload() {
  backgroundImg = loadImage("Images/bg.png");

  startImg = loadImage("Images/start.png");
  restartImg = loadImage("Images/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tiles = [];
  ball = new Ball(0.5 * windowWidth, 0.6 * windowHeight);
  paddle = new Paddle(0.5 * windowWidth, 0.9 * windowHeight);
  for (var i = 0.05; i <= 1; i += 0.1) {
    for (var x = 0.05; x < 0.5; x += 0.05) {
      tiles.push(new Tile(i * windowWidth, x * windowHeight));
    }
  }
  for (var z = 0; z < tiles.length; z++) {
    tiles[z].tileImage();
  }
  playButton = createSprite(windowWidth / 2, windowHeight / 2);
  playButton.addImage(startImg);
}

function draw() {
  background(backgroundImg);

  var edges = createEdgeSprites();
  paddle.sprite.x = mouseX;

  if (gameState === undefined) {
    playButton.visible = true;
    playButton.addImage(startImg);

    if (mousePressedOver(playButton)) {
      gameState = PLAY;
      ball.sprite.setVelocity(-5, 5);
    }
  }
  if (gameState === PLAY) {
    playButton.visible = false;
    ball.sprite.bounceOff(paddle.sprite);
    ball.sprite.bounceOff(edges[0]);
    ball.sprite.bounceOff(edges[1]);
    ball.sprite.bounceOff(edges[2]);
    if (ball.sprite.isTouching(edges[3])) {
      gameState = END;
      ball.sprite.x = 0.5 * windowWidth;
      ball.sprite.y = 0.6 * windowHeight;
      ball.setVelocity(0, 0);
    }
    for (var y = 0; y < tiles.length; y++) {
      if (ball.sprite.isTouching(tiles[y].sprite)) {
        ball.sprite.bounceOff(tiles[y].sprite);
        tiles[y].sprite.destroy();
      }
    }
  }

  drawSprites();
}
