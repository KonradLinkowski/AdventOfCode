const data = require('../../loader');

let i;
for (i = 4; i < data.length; i += 1) {
  const slice = data.slice(i - 4, i);
  if (new Set(slice).size === slice.length) {
    break;
  }
}
console.log(i);
