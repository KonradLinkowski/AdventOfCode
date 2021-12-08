const input = require('../../loader').split('\n').map(x => x.split(' | ')[1].split(' '))
let unique = 0
for (const line of input) {
  const un = line.filter(e => [2, 4, 3, 7].includes(e.length))
  unique += un.length
}

console.log(unique)
