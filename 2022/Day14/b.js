const map = {};
const d = require('../../loader')
  .split('\n')
  .map((line) =>
    line
      .split(' -> ')
      .map((item) => item.split(',').map(Number))
      .reduce(([ax, ay], curr) => {
        const [bx, by] = curr;
        if (ax === bx) {
          const [start, end] = ay < by ? [ay, by] : [by, ay];
          for (let i = start; i <= end; i += 1) {
            set(ax, i, '#');
          }
        } else {
          const [start, end] = ax < bx ? [ax, bx] : [bx, ax];
          for (let i = start; i <= end; i += 1) {
            set(i, ay, '#');
          }
        }

        return curr;
      })
  );

const floor = Math.max(...Object.keys(map)) + 2;

let iterations = 0;
main: while (true) {
  const sand = { x: 500, y: 0 };
  while (true) {
    if (sand.y + 1 === floor) {
      set(sand.x, sand.y, 'o');
      break;
    }

    if (!get(sand.x, sand.y + 1)) {
      sand.y += 1;
    } else if (!get(sand.x - 1, sand.y + 1)) {
      sand.x -= 1;
      sand.y += 1;
    } else if (!get(sand.x + 1, sand.y + 1)) {
      sand.x += 1;
      sand.y += 1;
    } else if (sand.y === 0) {
      break main;
    } else {
      set(sand.x, sand.y, 'o');
      break;
    }
  }
  iterations += 1;
}

console.log(iterations + 1);

function set(x, y, value) {
  if (!(y in map)) {
    map[y] = {};
  }
  if (!(x in map[y])) {
    map[y][x] = {};
  }
  map[y][x] = value;
}

function get(x, y) {
  if (!(y in map) || !(x in map[y])) {
    return undefined;
  }
  return map[y][x];
}
