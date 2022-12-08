const data = require('../../loader');
const grid = data
  .split('\n')
  .map((line, y) => line.split('').map((n, x) => ({ x, y, n: +n })));

const width = grid[0].length;
const height = grid.length;

let max = 0;

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const current = get(x, y);
    let bottom = 0;
    for (let cy = y + 1; cy < height; cy += 1) {
      const other = get(x, cy);
      if (!other) break;
      bottom += 1;
      if (other.n >= current.n) break;
    }
    let top = 0;
    for (let cy = y - 1; cy >= 0; cy -= 1) {
      const other = get(x, cy);
      if (!other) break;
      top += 1;
      if (other.n >= current.n) break;
    }
    let right = 0;
    for (let cx = x + 1; cx < width; cx += 1) {
      const other = get(cx, y);
      if (!other) break;
      right += 1;
      if (other.n >= current.n) break;
    }
    let left = 0;
    for (let cx = x - 1; cx >= 0; cx -= 1) {
      const other = get(cx, y);
      if (!other) break;
      left += 1;
      if (other.n >= current.n) break;
    }
    const score = top * left * right * bottom;
    if (score > max) {
      max = score;
    }
  }
}

console.log(max);

function get(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return undefined;
  }

  return grid[y][x];
}
