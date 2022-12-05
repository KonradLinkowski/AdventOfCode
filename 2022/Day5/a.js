const data = require('../../loader');
const [createsInfo, instructions] = data.split('\n\n');

const creates = Array(+createsInfo.match(/(\d+)(?!.*\d)/)[0])
  .fill()
  .map(() => []);

for (const line of createsInfo.split('\n').slice(0, -1).reverse()) {
  for (let i = 1; i < line.length; i += 4) {
    if (line[i] !== ' ') {
      creates[(i - 1) / 4].push(line[i]);
    }
  }
}

for (const line of instructions.split('\n')) {
  const [count, from, to] = line.match(/\d+/g);
  for (let i = 0; i < count; i += 1) {
    const create = creates[from - 1].pop();
    creates[to - 1].push(create);
  }
}

const result = creates.map((c) => c[c.length - 1]).join('');

console.log(result);
