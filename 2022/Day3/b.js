const data = require('../../loader');
const rucksacks = data.split('\n');

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let sum = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  const first = [...rucksacks[i]];
  const second = rucksacks[i + 1];
  const third = rucksacks[i + 2];

  const badge = first.find(
    (item) => second.includes(item) && third.includes(item)
  );

  if (lowercase.includes(badge)) {
    sum += lowercase.indexOf(badge) + 1;
  } else {
    sum += uppercase.indexOf(badge) + 27;
  }
}

console.log(sum);
