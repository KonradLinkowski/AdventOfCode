const data = require('../../loader');
const lines = data.split('\n').map((e) => e.split('   ').map(Number));
console.log(lines);
const [left, right] = [lines.map((l) => l[0]), lines.map((l) => l[1])];
const map = new Map();
for (const a of left) {
  if (map.has(a)) continue;
  map.set(a, right.filter((b) => b === a).length);
}

let sum = 0;
for (const a of left) {
  sum += a * map.get(a);
}

console.log(sum);
