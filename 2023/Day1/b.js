const data = require('../../loader');

const frontMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const backMap = Object.fromEntries(
  Object.entries(frontMap).map(([key, value]) => [
    [...key].toReversed().join(''),
    value,
  ])
);

console.log(backMap);

const frontWords = Object.keys(frontMap);
const backWords = Object.keys(backMap);

const firstRegex = new RegExp(frontWords.join('|') + '|\\d');
const lastRegex = new RegExp(backWords.join('|') + '|\\d');

const getValue = (n) =>
  n in frontMap ? frontMap[n] : n in backMap ? backMap[n] : n;

const lines = data.split('\n');
const numbers = lines.map((line) => {
  const [firstDigit] = line.match(firstRegex);
  const [lastDigit] = [...line].toReversed().join('').match(lastRegex);
  const s = Number(getValue(firstDigit) + getValue(lastDigit));
  return s;
});
const sum = numbers.reduce((s, c) => s + c);

console.log(sum);
