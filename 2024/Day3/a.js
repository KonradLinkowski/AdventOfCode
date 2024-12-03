const data = require('../../loader');

let sum = 0;
for (const [_, a, b] of data.matchAll(/mul\((\d+),(\d+)\)/)) {
  sum += a * b;
}

console.log(sum);
