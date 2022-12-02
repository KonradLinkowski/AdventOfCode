const data = require('../../loader');
const rounds = data.split('\n');

const wins = {
  A: {
    X: 4,
    Y: 8,
    Z: 3,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6,
  },
};

const sum = rounds.reduce((sum, round) => {
  const [opponent, you] = round.split(' ');
  const score = wins[opponent][you];
  return sum + score;
}, 0);

console.log(sum);
