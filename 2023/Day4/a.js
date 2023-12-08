const cards = require('../../loader').split('\n');

const scores = cards.map((card) => {
  const [, w, m] = card.split(/[|:]/);
  const winning = w.match(/\d+/g).map(Number);
  const my = m.match(/\d+/g).map(Number);
  const matching = my.filter((n) => winning.includes(n));
  const points = matching.length;
  return points ? 2 ** (points - 1) : 0;
});

const sum = scores.reduce((s, c) => s + c);

console.log(sum);
