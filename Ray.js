function Ray(angle) {
  this.angle = angle;

  this.render = (startX, startY) => {
    stroke("rgba(255, 0, 0, 0.25)");
    line(
      startX,
      startY,
      startX + 30 * Math.cos(angle),
      startY + 30 * Math.sin(angle)
    );
  };
}

function Rays() {
  this.rays = [];

  this.castAll = (player) => {
    let cur_col = 0;

    let ray_angle = player.rotation - FOV_ANGLE / 2;
    this.rays = [];
    for (let i = 0; i < NUM_RAYS; i++) {
      let ray = new Ray(ray_angle);
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
