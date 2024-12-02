const data = require('../../loader');
const levels = data.split('\n').map((e) => e.split(' ').map(Number));

let safe = 0;
for (const level of levels) {
  if (isSafe(level)) {
    safe += 1;
  }
}

console.log(safe);

function isSafe(level) {
  let sign = 0;
  for (let i = 0; i < level.length - 1; i += 1) {
    const diff = level[i] - level[i + 1];
    const abs = Math.abs(diff);
    if (abs < 1 || abs > 3) return false;
    const s = Math.sign(diff);
    if (sign) {
      if (sign !== s) return false;
    } else {
      sign = s;
    }
  }
  return true;
}
