const data = require('../../loader');

let sum = 0;
let du = true;

for (const match of data.matchAll(/mul\((\d+),(\d+)\)|don't|do/g)) {
  if (match[0] === 'do') du = true;
  else if (match[0] === "don't") du = false;
  else if (du) sum += match[1] * match[2];
}

console.log(sum);
