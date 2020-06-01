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

  map.render();
  rays.renderAll(player.x, player.y);
  player.render();
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
