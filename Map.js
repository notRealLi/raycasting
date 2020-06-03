function Map(numRows, numCols, tileSize) {
  this.tileSize = tileSize;
  this.maxNumRandomWalls = 25;
  // this.grid = [
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  //   [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  //   [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  //   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  //   [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
  //   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //   [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
  //   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // ];
  this.rays = [];

  this.generateGrid = (rows, cols) => {
    let curNumRandomWalls = 0;
    let grid = [];

    for (let i = 0; i < rows; i++) {
      let curRow = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
          curRow[j] = 1;
        } else if (
          curNumRandomWalls < this.maxNumRandomWalls &&
          flipACoin() &&
          !playerSpawnPositionHeuristic(i, j)
        ) {
          curRow[j] = 1;
          curNumRandomWalls++;
        } else {
          curRow[j] = 0;
        }
      }
      grid.push(curRow);
    }

    return grid;
  };

  this.grid = this.generateGrid(numRows, numCols);

  this.render = (scale = 1) => {
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        const x = this.tileSize * j;
        const y = this.tileSize * i;
        const tileColor = this.grid[i][j] === 1 ? "#222" : "#fff";

        stroke("#222");
        fill(tileColor);
        rect(
          x * scale,
          y * scale,
          this.tileSize * scale,
          this.tileSize * scale
        );
      }
    }
  };

  this.wallCollisionDetector = (x, y) => {
    if (x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT) return true;

    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);

    return this.grid[row][col] === 1;
  };
}
