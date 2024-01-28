let size = 10;
let grid;
let h;
let w;
let floor_h;
let floor_color = "#6e5124";
let sand_color = "#fcef9a";
let sky_color = "#77b9f7";
let crosshairSize = 3;

function setup() {
  floor_h = 100;

  createCanvas(800, 800 + floor_h);

  h = Math.floor((height - floor_h) / size);
  w = Math.floor(width / size);
  grid = createNewGrid(h, w);
}

function draw() {
  background(floor_color);
  displayGrid(grid);
  updateSand();
  displayCrosshair();

  if (mouseIsPressed) {
    createSand();
  }
}

function createSand() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let y = Math.floor(mouseY / size);
    let x = Math.floor(mouseX / size);

    let radius = Math.floor(crosshairSize / 2);
    for (let i = -radius; i <= radius; i++) {
      for (let j = -radius; j <= radius; j++) {
        if (y + i >= 0 && y + i < h && x + j >= 0 && x + j < w) {
          grid[y + i][x + j] = 1;
        }
      }
    }
    // grid[y][x] = 1;
  }
}

function displayCrosshair() {
  rectMode(CENTER);
  noFill();
  stroke(0);
  strokeWeight(1);

  rect(mouseX, mouseY, crosshairSize * size, crosshairSize * size);
}

function updateSand() {
  let newGrid = createNewGrid(h, w);

  for (let i = h - 1; i >= 0; i--) {
    for (let j = 0; j < w; j++) {
      if (grid[i][j] == 1) {
        let dirs = [-1, 1];
        let dir = random(dirs);

        if (i + 1 < h && grid[i + 1][j] == 0) {
          grid[i][j] = 0;
          newGrid[i + 1][j] = 1;
        } else if (i + 1 < h && j + dir < w && grid[i + 1][j + dir] == 0) {
          grid[i][j] = 0;
          newGrid[i + 1][j + dir] = 1;
        } else if (i + 1 < h && j - dir >= 0 && grid[i + 1][j - dir] == 0) {
          grid[i][j] = 0;
          newGrid[i + 1][j - dir] = 1;
        } else {
          newGrid[i][j] = grid[i][j];
        }
      }
    }
  }

  grid = newGrid;
}

function createNewGrid(h, w) {
  let grid = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(0);
    }
    grid.push(row);
  }

  return grid;
}

function displayGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let x = j * size;
      let y = i * size;

      if (grid[i][j] == 0) {
        noStroke();
        fill(sky_color);
      } else {
        noStroke();
        // stroke(0);
        fill(sand_color);
      }
      rectMode(CORNER);
      rect(x, y, size, size);
    }
  }
}
