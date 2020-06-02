let map;
let player;
let rays;

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  map = new Map();
  player = new Player();
  rays = new Rays();
}

function update() {
  player.update(map.wallCollisionDetector);
  rays.castAll(player, map);
}

function draw() {
  update();

  clear("#555");
  render3DProjectedWalls();
  map.render(MINI_MAP_SCALE_FACTOR);
  rays.renderAll(player.x, player.y, MINI_MAP_SCALE_FACTOR);
  player.render(MINI_MAP_SCALE_FACTOR);
}

function render3DProjectedWalls() {
  for (let i = 0; i < rays.size(); i++) {
    const ray = rays.get(i);

    const distanceToWall2D = ray.distance;
    const wallHeight2D = TILE_SIZE; // not necessarily tied to TILE_SIZE
    const distanceToWall3D = (WINDOW_WIDTH * 0.5) / Math.tan(FOV_ANGLE / 2);

    // wallHeight3D / wallHeight2D = distanceToWall3D / distanceToWall2D
    const wallHeight3D = (distanceToWall3D / distanceToWall2D) * wallHeight2D;
    const wallWidth3D = WALL_STRIP_WIDTH; // same as width of ray
    const wallPosX3D = i * wallWidth3D;
    const wallPosY3D = (WINDOW_HEIGHT - wallHeight3D) * 0.5;

    fill("rgba(255, 255, 255, 1)");
    noStroke();
    rect(wallPosX3D, wallPosY3D, wallWidth3D, wallHeight3D);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.moveDirection = 1;
  } else if (keyCode === DOWN_ARROW) {
    player.moveDirection = -1;
  } else if (keyCode === LEFT_ARROW) {
    player.turnDirection = -1;
  } else if (keyCode === RIGHT_ARROW) {
    player.turnDirection = 1;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    player.moveDirection = 0;
  } else if (keyCode === DOWN_ARROW) {
    player.moveDirection = 0;
  } else if (keyCode === LEFT_ARROW) {
    player.turnDirection = 0;
  } else if (keyCode === RIGHT_ARROW) {
    player.turnDirection = 0;
  }
}

function mousePressed() {
  console.log(rays.rays[0].wallHitX, rays.rays[0].wallHitY);
}
