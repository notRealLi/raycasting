function Ray(angle) {
  this.angle = normalizeAngle(angle);
  this.wallHitX = 0;
  this.wallHitY = 0;
  this.isFacingDown = this.angle > 0 && this.angle < Math.PI;
  this.isFacingUp = !this.isFacingDown;
  this.isFacingRight = this.angle < 0.5 * Math.PI || this.angle > 1.5 * Math.PI;
  this.isFacingLeft = !this.isFacingRight;

  this.render = (startX, startY) => {
    stroke("rgba(255, 0, 0, 0.25)");
    line(
      startX,
      startY,
      this.wallHitX,
      this.wallHitY
      //startX + 30 * Math.cos(angle),
      //startY + 30 * Math.sin(angle)
    );
  };

  this.cast = (startX, startY, tileSize, grid) => {
    let yIntercept = this.isFacingUp
      ? Math.floor(startY / tileSize) * tileSize
      : Math.ceil(startY / tileSize) * tileSize;
    let xIntercept = startX + (yIntercept - startY) / Math.tan(this.angle);

    let yStep = tileSize;
    yStep *= this.isFacingUp ? -1 : 1;
    let xStep = tileSize / Math.tan(this.angle);
    xStep *= this.isFacingLeft && xStep > 0 ? -1 : 1;
    xStep *= this.isFacingRight && xStep < 0 ? -1 : 1;

    while (
      xIntercept < grid[0].length * tileSize &&
      xIntercept > 0 &&
      yIntercept < grid.length * tileSize &&
      yIntercept > 0
    ) {
      const row = this.isFacingUp
        ? yIntercept / tileSize - 1
        : yIntercept / tileSize;
      const col = Math.floor(xIntercept / tileSize);

      if (grid[row][col] === 1) {
        break;
      }

      yIntercept += yStep;
      xIntercept += xStep;
    }

    this.wallHitX = xIntercept;
    this.wallHitY = yIntercept;

    // const firstVerticalxIntercept = Math.ceil(startX / tileSize);
    // const firstVerticalyIntercept =
    //   startY - (firstVerticalxIntercept - startX) * Math.tan(this.angle);
  };
}

function Rays() {
  this.rays = [];

  this.castAll = (player, map) => {
    let cur_col = 0;

    let ray_angle = player.rotation - FOV_ANGLE / 2;
    this.rays = [];
    for (let i = 0; i < 1; i++) {
      let ray = new Ray(ray_angle);
      ray.cast(player.x, player.y, map.tileSize, map.grid);
      this.rays.push(ray);

      ray_angle += FOV_ANGLE / NUM_RAYS;
      cur_col++;
    }
  };

  this.renderAll = (x, y) => {
    this.rays.forEach((ray) => {
      ray.render(x, y);
    });
  };
}
