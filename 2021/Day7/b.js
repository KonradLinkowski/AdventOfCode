const input = require('../../loader').split(',').map(Number)
const sum = input.reduce((s, c) => s + c)
const avg = Math.floor(sum / input.length)

let best = Infinity
for (let i = -1000; i <= 1000; i += 1) {
  let cost = 0
  for (const num of input) {
    const diff = Math.abs(num - avg + i)
    const sum = (1 + diff) * diff / 2
    cost += sum
  }
  if (cost < best) {
    best = cost
  }
}


console.log(best)
