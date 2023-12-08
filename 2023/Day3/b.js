const data = require('../../loader').split('\n');

const potentialGears = {};

for (const key in data) {
  const line = data[key];
  for (const match of line.matchAll(/\d+/g)) {
    const [number] = match;
    for (let y = key - 1; y <= +key + 1; y += 1) {
      for (let x = match.index - 1; x <= match.index + number.length; x += 1) {
        if (y < 0 || y >= data.length || x < 0 || x >= data[y].length) continue;
        if (data[y][x] === '*') {
          const key = `${x};${y}`;
          if (key in potentialGears) {
            potentialGears[key].numbers.push(+number);
          } else {
            potentialGears[key] = {
              x,
              y,
              numbers: [+number],
            };
          }
        }
      }
    }
  }
}

const gears = Object.values(potentialGears).filter(
  (gear) => gear.numbers.length === 2
);

const sum = gears.reduce((s, c) => s + c.numbers.reduce((m, n) => m * n), 0);

console.log(sum);
