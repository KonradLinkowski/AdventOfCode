const cards = require('../../loader').split('\n');

const scores = cards.map((card) => {
  const [, w, m] = card.split(/[|:]/);
  const winning = w.match(/\d+/g).map(Number);
  const my = m.match(/\d+/g).map(Number);
  const matching = my.filter((n) => winning.includes(n));
  return matching.length;
});

const myCards = Array(cards.length).fill(1);

for (let i = 0; i < scores.length; i += 1) {
  for (let j = 0; j < scores[i]; j += 1) {
    const ind = i + 1 + j;
    myCards[ind] += myCards[i];
  }
}

const sum = myCards.reduce((s, c) => s + c);

console.log(sum);
