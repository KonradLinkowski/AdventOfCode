const data = require('../../loader');
const pairs = data.split('\n').map(e => e.split(',').map(e => e.split('-').map(Number)));

const final = pairs.reduce((count, [l, r]) => {
  return count + (l[0] <= r[0] && l[1] >= r[0] || l[0] <= r[1] && l[1] >= r[1] || r[0] <= l[0] && r[1] >= l[0] || r[0] <= l[1] && r[1] >= l[1])
}, 0)

console.log(final)
