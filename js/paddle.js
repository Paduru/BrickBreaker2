class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.animation1 = loadAnimation(
      "Images/NormalPaddle/paddle1.png",
      "Images/NormalPaddle/paddle2.png",
      "Images/NormalPaddle/paddle3.png"
    );
    this.animation2 = loadAnimation(
      "Images/BulletPaddle/bulletP1.png",
      "Images/BulletPaddle/bulletP2.png",
      "Images/BulletPaddle/bulletP3.png"
    );
    this.image = loadImage("Images/extendPaddle.png");
    this.lives = 3;
    this.sprite = createSprite(this.x, this.y);
    this.sprite.addAnimation("regular paddle", this.animation1);
    this.sprite.scale = 1 / 2;
  }
  bulletPaddle() {
    this.sprite.addAnimation("bullet paddle", this.animation2);
  }
  biggerPaddle() {
    this.sprite.addImage("extended paddle", this.image);
  }
  firePaddle() {}
}
