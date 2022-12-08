const data = require('../../loader');
const grid = data
  .split('\n')
  .map((line, y) => line.split('').map((n, x) => ({ x, y, n: +n })));

const width = grid[0].length;
const height = grid.length;

const list = grid.flat();

for (let y = 0; y < height; y += 1) {
  let max = -1;
  for (let x = 0; x < width; x += 1) {
    const current = get(x, y);
    if (current.n > max) {
      max = current.n;
      current.visible = true;
    }
  }
}

for (let y = 0; y < height; y += 1) {
  let max = -1;
  for (let x = width - 1; x >= 0; x -= 1) {
    const current = get(x, y);
    if (current.n > max) {
      max = current.n;
      current.visible = true;
    }
  }
}

for (let x = 0; x < width; x += 1) {
  let max = -1;
  for (let y = 0; y < height; y += 1) {
    const current = get(x, y);
    if (current.n > max) {
      max = current.n;
      current.visible = true;
    }
  }
}

for (let x = 0; x < width; x += 1) {
  let max = -1;
  for (let y = height - 1; y >= 0; y -= 1) {
    const current = get(x, y);
    if (current.n > max) {
      max = current.n;
      current.visible = true;
    }
  }
}

const visible = list.filter((item) => item.visible).length;

console.log(visible);

function get(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return undefined;
  }

  return grid[y][x];
}
