const data = require('../../loader');

const directions = {
  R: { x: 1, y: 0 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: -1 },
};

const diagonals = [
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
];

const moves = data
  .split('\n')
  .map((e) => e.split(' ').map((e, i) => (i == 0 ? e : +e)));

const rope = Array(10)
  .fill()
  .map(() => ({ x: 0, y: 0 }));
const head = rope[0];
const tail = rope[rope.length - 1];

const visited = new Set();

for (const [dir, count] of moves) {
  const direction = directions[dir];
  for (let i = 0; i < count; i += 1) {
    head.x += direction.x;
    head.y += direction.y;

    for (let j = 1; j < rope.length; j += 1) {
      const prev = rope[j - 1];
      const curr = rope[j];
      const currentDistance = distance(prev, curr);
      if (currentDistance >= 2) {
        const bestPos = getBestPos(prev, curr);
        curr.x = bestPos.x;
        curr.y = bestPos.y;
      }
    }
    const key = `${tail.x}:${tail.y}`;
    visited.add(key);
  }
}

console.log(visited.size);

function getBestPos(prev, curr) {
  let minDist = Infinity;
  let bestPos = null;
  for (const { x: dx, y: dy } of diagonals) {
    const newPos = { x: curr.x + dx, y: curr.y + dy };
    const dist = distance(prev, newPos);
    if (dist < minDist) {
      minDist = dist;
      bestPos = newPos;
    }
  }
  return bestPos;
}

function distance(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
