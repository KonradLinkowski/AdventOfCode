const data = require('../../loader');
const rucksacks = data.split('\n');

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const final = rucksacks.reduce((count, curr) => {
  const l = curr.slice(0, curr.length / 2);
  const r = curr.slice(curr.length / 2);

  const duplicates = [...new Set(l)].filter((c) => r.includes(c));

  const score = duplicates
    .map((d) => {
      if (lowercase.includes(d)) {
        const index = lowercase.indexOf(d);
        return index + 1;
      }
      if (uppercase.includes(d)) {
        const index = uppercase.indexOf(d);
        return index + 27;
      }

      throw new Error(`${d} has not been found`);
    })
    .reduce((sum, c) => sum + c, 0);

  return count + score;
}, 0);

console.log(final);
