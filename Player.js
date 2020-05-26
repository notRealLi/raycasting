function Player() {
  this.x = WINDOW_WIDTH / 2;
  this.y = WINDOW_HEIGHT / 2;
  this.radius = 3;
  this.turnDirection = 0;
  this.moveDirection = 0;
  this.rotation = Math.PI / 2;
  this.moveSpeed = 2.0;
  this.turnSpeed = 2 * (Math.PI / 180);

  this.render = () => {
    noStroke();
    fill("red");
    circle(this.x, this.y, this.radius);
    stroke("red");
    line(
      this.x,
      this.y,
      this.x + 20 * Math.cos(this.rotation),
      this.y + 20 * Math.sin(this.rotation)
    );
  };

  this.update = (wallCollisionDetector) => {
    this.rotation += this.turnDirection * this.turnSpeed;
    const nextX =
      this.x + this.moveDirection * this.moveSpeed * Math.cos(this.rotation);
    const nextY =
      this.y + this.moveDirection * this.moveSpeed * Math.sin(this.rotation);

    if (!wallCollisionDetector(nextX, nextY)) {
      this.x = nextX;
      this.y = nextY;
    }
  };
}
