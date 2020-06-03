//const TILE_SIZE = 64;
const TILE_SIZE = 38;
const NUM_ROWS = 11;
const NUM_COLS = 15;
const WINDOW_WIDTH = TILE_SIZE * NUM_COLS;
const WINDOW_HEIGHT = TILE_SIZE * NUM_ROWS;

const FOV_ANGLE = Math.PI * (60 / 180);
const WALL_STRIP_WIDTH = 1; // pixels
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH;
//const MINI_MAP_SCALE_FACTOR = 0.2;
const MINI_MAP_SCALE_FACTOR = 0.4;

function normalizeAngle(angle) {
  angle = angle % (Math.PI * 2);
  if (angle < 0) angle += Math.PI * 2;

  return angle;
}

function distanceBetween(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

// biased coin
function flipACoin() {
  return Math.random() > 0.8;
}

function playerSpawnPositionHeuristic(row, col) {
  return (row === 5 || row === 6) && col === 7;
}
