const data = require('../../loader');
const rounds = data.split('\n');

const wins = {
  A: {
    X: 3,
    Y: 4,
    Z: 8,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7,
  },
};

const sum = rounds.reduce((sum, round) => {
  const [opponent, you] = round.split(' ');
  const score = wins[opponent][you];
  return sum + score;
}, 0);

console.log(sum);
