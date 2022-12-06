const data = require('../../loader');

let i;
for (i = 14; i < data.length; i += 1) {
  const slice = data.slice(i - 14, i);
  if (new Set(slice).size === slice.length) {
    break;
  }
}
console.log(i);
