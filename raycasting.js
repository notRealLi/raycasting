let map;
let player;
let rays;

function setup() {
  configWindow();
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  initModels();
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

function configWindow() {
  TILE_SIZE = Math.min(
    Math.floor((windowWidth * 0.95) / NUM_COLS),
    MAX_TILE_SIZE
  );
  WINDOW_WIDTH = TILE_SIZE * NUM_COLS;
  WINDOW_HEIGHT = TILE_SIZE * NUM_ROWS;
  NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH;
}

function initModels() {
  player = new Player();
  map = new Map(NUM_ROWS, NUM_COLS, TILE_SIZE);
  rays = new Rays();
}

function render3DProjectedWalls() {
  for (let i = 0; i < rays.size(); i++) {
    const ray = rays.get(i);

    const distortedDistanceToWall2D = ray.distance;
    const distanceToWall2D =
      distortedDistanceToWall2D * Math.cos(player.rotation - ray.angle);
    const wallHeight2D = TILE_SIZE; // not necessarily tied to TILE_SIZE
    const distanceToWall3D = (WINDOW_WIDTH * 0.5) / Math.tan(FOV_ANGLE / 2);

    // wallHeight3D / wallHeight2D = distanceToWall3D / distanceToWall2D
    const wallHeight3D = (distanceToWall3D / distanceToWall2D) * wallHeight2D;
    const wallWidth3D = WALL_STRIP_WIDTH; // same as width of ray
    const wallPosX3D = i * wallWidth3D;
    const wallPosY3D = (WINDOW_HEIGHT - wallHeight3D) * 0.5;

    const shade = 1 - (distanceToWall2D / WINDOW_HEIGHT) * 0.6;
    fill(`rgba(255, 255, 255, ${shade})`);
    noStroke();
    rect(wallPosX3D, wallPosY3D, wallWidth3D, wallHeight3D);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === 87) {
    player.moveDirection = 1;
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    player.moveDirection = -1;
  } else if (keyCode === LEFT_ARROW || keyCode === 65) {
    player.turnDirection = -1;
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    player.turnDirection = 1;
  } else if (keyCode === 32) {
    // SPACE key pressed
    player = new Player();
    map = new Map(NUM_ROWS, NUM_COLS, TILE_SIZE);
    rays = new Rays();
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === 87) {
    player.moveDirection = 0;
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    player.moveDirection = 0;
  } else if (keyCode === LEFT_ARROW || keyCode === 65) {
    player.turnDirection = 0;
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    player.turnDirection = 0;
  }
}

function windowResized() {
  configWindow();
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  initModels();

  clear("#555");
  render3DProjectedWalls();
  map.render(MINI_MAP_SCALE_FACTOR);
  rays.renderAll(player.x, player.y, MINI_MAP_SCALE_FACTOR);
  player.render(MINI_MAP_SCALE_FACTOR);
}
