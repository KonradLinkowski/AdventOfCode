const data = require('../../loader');
const lines = data.split('\n').map((e) => e.split('   ').map(Number));
const [left, right] = [lines.map((l) => l[0]), lines.map((l) => l[1])];
left.sort();
right.sort();
let distance = 0;
for (let i = 0; i < lines.length; i += 1) {
  distance += Math.abs(left[i] - right[i]);
}

console.log(distance);
