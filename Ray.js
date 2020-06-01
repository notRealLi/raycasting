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
    line(startX, startY, this.wallHitX, this.wallHitY);
  };

  this.cast = (startX, startY, tileSize, grid) => {
    let foundHorizontalIntercept = false;
    let foundVerticalIntercept = false;

    // horizontal intercept
    let yIntercept = this.isFacingUp
      ? Math.floor(startY / tileSize) * tileSize
      : Math.ceil(startY / tileSize) * tileSize;
    let xIntercept = startX + (yIntercept - startY) / Math.tan(this.angle);

    let yStep = tileSize;
    yStep *= this.isFacingUp ? -1 : 1;
    let xStep = tileSize / Math.tan(this.angle);
    xStep *= this.isFacingLeft && xStep > 0 ? -1 : 1;
    xStep *= this.isFacingRight && xStep < 0 ? -1 : 1;

    let nextHorizontalX = xIntercept;
    let nextHorizontalY = yIntercept;

    while (
      nextHorizontalX < grid[0].length * tileSize &&
      nextHorizontalX > 0 &&
      nextHorizontalY < grid.length * tileSize &&
      nextHorizontalY > 0
    ) {
      const row = this.isFacingUp
        ? nextHorizontalY / tileSize - 1
        : nextHorizontalY / tileSize;
      const col = Math.floor(nextHorizontalX / tileSize);

      if (grid[row][col] === 1) {
        foundHorizontalIntercept = true;
        break;
      }

      nextHorizontalX += xStep;
      nextHorizontalY += yStep;
    }

    // vertical intercept
    xIntercept = this.isFacingLeft
      ? Math.floor(startX / tileSize) * tileSize
      : Math.ceil(startX / tileSize) * tileSize;
    yIntercept = startY + (xIntercept - startX) * Math.tan(this.angle);

    xStep = tileSize;
    xStep *= this.isFacingLeft ? -1 : 1;
    yStep = tileSize * Math.tan(this.angle);
    yStep *= this.isFacingDown && yStep < 0 ? -1 : 1;
    yStep *= this.isFacingUp && yStep > 0 ? -1 : 1;

    let nextVerticalX = xIntercept;
    let nextVerticalY = yIntercept;

    while (
      nextVerticalX <= grid[0].length * tileSize &&
      nextVerticalX >= 0 &&
      nextVerticalY <= grid.length * tileSize &&
      nextVerticalY >= 0
    ) {
      const col = this.isFacingLeft
        ? nextVerticalX / tileSize - 1
        : nextVerticalX / tileSize;
      const row = Math.floor(nextVerticalY / tileSize);

      if (grid[row][col] === 1) {
        foundVerticalIntercept = true;
        break;
      }

      nextVerticalX += xStep;
      nextVerticalY += yStep;
    }

    if (foundHorizontalIntercept && !foundVerticalIntercept) {
      this.wallHitX = nextHorizontalX;
      this.wallHitY = nextHorizontalY;
    } else if (foundVerticalIntercept && !foundHorizontalIntercept) {
      this.wallHitX = nextVerticalX;
      this.wallHitY = nextVerticalY;
    } else if (
      distanceBetween(nextHorizontalX, nextHorizontalY, startX, startY) <
      distanceBetween(nextVerticalX, nextVerticalY, startX, startY)
    ) {
      this.wallHitX = nextHorizontalX;
      this.wallHitY = nextHorizontalY;
    } else {
      this.wallHitX = nextVerticalX;
      this.wallHitY = nextVerticalY;
    }
  };
}

function Rays() {
  this.rays = [];

  this.castAll = (player, map) => {
    let ray_angle = player.rotation - FOV_ANGLE / 2;
    this.rays = [];
    for (let i = 0; i < NUM_RAYS; i++) {
      let ray = new Ray(ray_angle);
      ray.cast(player.x, player.y, map.tileSize, map.grid);
      this.rays.push(ray);

      ray_angle += FOV_ANGLE / NUM_RAYS;
    }
  };

  this.renderAll = (x, y) => {
    this.rays.forEach((ray) => {
      ray.render(x, y);
    });
  };
}
