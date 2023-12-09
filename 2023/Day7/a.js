const hands = require('../../loader')
  .split('\n')
  .map((h) => {
    const [hand, bid] = h.split(' ');
    return { hand, bid: +bid };
  });

const getType = (hand) => {
  const labels = {};

  for (const card of hand) {
    if (!(card in labels)) {
      labels[card] = 1;
    } else {
      labels[card] += 1;
    }
  }

  const labelsList = Object.values(labels);
  const numberOfLabels = labelsList.length;

  if (numberOfLabels === 5) return 'high';
  if (numberOfLabels === 4) return 'one';
  if (numberOfLabels === 3) {
    if (labelsList.includes(3)) return 'three';
    return 'two';
  }
  if (numberOfLabels === 2) {
    if (labelsList.includes(4)) return 'four';
    return 'full';
  }
  return 'five';
};

const labelOrder = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];
const typeOrder = ['five', 'four', 'full', 'three', 'two', 'one', 'high'];

const sorted = hands.toSorted(({ hand: a }, { hand: b }) => {
  const aType = typeOrder.indexOf(getType(a));
  const bType = typeOrder.indexOf(getType(b));

  if (aType !== bType) return bType - aType;

  for (let i = 0; i < a.length; i += 1) {
    const aLabel = labelOrder.indexOf(a[i]);
    const bLabel = labelOrder.indexOf(b[i]);
    if (aLabel !== bLabel) return bLabel - aLabel;
  }
});

const result = sorted.reduce((sum, { bid }, i) => {
  sum += bid * (i + 1);
  return sum;
}, 0);

console.log(result);
