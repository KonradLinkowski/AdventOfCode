const data = require('../../loader').split('\n');

const validNumbers = [];

for (const key in data) {
  const line = data[key];
  line: for (const match of line.matchAll(/\d+/g)) {
    const [number] = match;
    for (let y = key - 1; y <= +key + 1; y += 1) {
      for (let x = match.index - 1; x <= match.index + number.length; x += 1) {
        if (y < 0 || y >= data.length || x < 0 || x >= data[y].length) continue;
        if (/[^.\d]/.test(data[y][x])) {
          validNumbers.push(+number);
          continue line;
        }
      }
    }
  }
}

const sum = validNumbers.reduce((s, c) => s + c);

console.log(sum);
