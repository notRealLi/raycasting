const NUM_ROWS = 11;
const NUM_COLS = 15;
const MAX_TILE_SIZE = 62;
let TILE_SIZE;
let WINDOW_WIDTH;
let WINDOW_HEIGHT;

const FOV_ANGLE = Math.PI * (60 / 180);
const WALL_STRIP_WIDTH = 1; // pixels

let NUM_RAYS;
//const MINI_MAP_SCALE_FACTOR = 0.3;
const MINI_MAP_SCALE_FACTOR = 0.23;

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
  return (row === 4 || row === 5 || row === 6 || row === 7) && col === 7;
}
