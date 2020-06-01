const TILE_SIZE = 32;
const NUM_ROWS = 11;
const NUM_COLS = 15;
const WINDOW_WIDTH = TILE_SIZE * NUM_COLS;
const WINDOW_HEIGHT = TILE_SIZE * NUM_ROWS;

const FOV_ANGLE = Math.PI * (60 / 180);
const WALL_STRIP_WIDTH = 30; // pixels
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH;

function normalizeAngle(angle) {
  angle = angle % (Math.PI * 2);
  if (angle < 0) angle += Math.PI * 2;

  return angle;
}
