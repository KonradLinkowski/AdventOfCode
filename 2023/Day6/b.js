const [t, d] = require('../../loader').replace(/ +/g, '').split('\n');

const times = t.match(/\d+/g).map(Number);
const distances = d.match(/\d+/g).map(Number);

const races = times.map((time, i) => ({ time, record: distances[i] }));

const results = races.map(({ time, record }) => {
  let start, end;
  for (let i = 1; i < time; i += 1) {
    const distance = i * (time - i);
    if (distance > record) {
      start = i;
      break;
    }
  }

  for (let i = time - 1; i > 0; i -= 1) {
    const distance = i * (time - i);
    if (distance > record) {
      end = i;
      break;
    }
  }

  return end - start + 1;
});

const sum = results.reduce((s, c) => s * c);
console.log(sum);
