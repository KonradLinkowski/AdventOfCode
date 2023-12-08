const data = require('../../loader');
const lines = data.split('\n');
const numbers = lines.map((line) => {
  const digits = line.match(/\d/g);
  return Number(digits.at(0) + digits.at(-1));
});
const sum = numbers.reduce((s, c) => s + c);

console.log(sum);
