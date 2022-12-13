const dividers = '[[2]] [[6]]'.split(' ').map((d) => JSON.parse(d));

const pairs = [
  ...require('../../loader')
    .replace(/\n\n/g, '\n')
    .split('\n')
    .map((line) => JSON.parse(line)),
  ...dividers,
];

pairs.sort((a, b) => {
  const val = compare(a, b);

  return val === null ? 0 : val ? -1 : 1;
});

const result =
  (pairs.indexOf(dividers[0]) + 1) * (pairs.indexOf(dividers[1]) + 1);

console.log(result);

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
