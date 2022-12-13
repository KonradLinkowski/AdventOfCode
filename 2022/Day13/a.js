const pairs = require('../../loader').split('\n\n');

let sum = 0;

for (let i = 0; i < pairs.length; i += 1) {
  const pair = pairs[i];
  const [as, bs] = pair.split('\n');
  const a = JSON.parse(as);
  const b = JSON.parse(bs);

  const val = compare(a, b);

  if (val) {
    sum += i + 1;
  }
}

console.log(sum);

function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a < b ? true : a > b ? false : null;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const len = Math.max(a.length, b.length);

    for (let i = 0; i < len; i += 1) {
      if (a[i] === undefined) return true;
      if (b[i] === undefined) return false;
      const val = compare(a[i], b[i]);
      if (val !== null) return val;
    }
    return null;
  }

  if (typeof a === 'number') a = [a];

  if (typeof b === 'number') b = [b];

  return compare(a, b);
}
