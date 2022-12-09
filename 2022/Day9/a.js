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

const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };

const visited = new Set();

for (const [dir, count] of moves) {
  const direction = directions[dir];
  for (let i = 0; i < count; i += 1) {
    head.x += direction.x;
    head.y += direction.y;

    const currentDistance = distance(head, tail);
    if (currentDistance >= 2) {
      const bestPos = getBestPos(head, tail);
      tail.x = bestPos.x;
      tail.y = bestPos.y;
    }
    const key = `${tail.x}:${tail.y}`;
    visited.add(key);
  }
}

console.log(visited.size);

function getBestPos(head, tail) {
  let minDist = Infinity;
  let bestPos = null;
  for (const { x: dx, y: dy } of diagonals) {
    const newPos = { x: tail.x + dx, y: tail.y + dy };
    const dist = distance(head, newPos);
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
