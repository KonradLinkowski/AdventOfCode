const input = require('../../loader').split(',').map(Number)
const sum = input.reduce((s, c) => s + c)
const avg = Math.floor(sum / input.length)

let best = Infinity
for (let i = -1000; i <= 1000; i += 1) {
  let cost = 0
  for (const num of input) {
    cost += Math.abs(num - avg + i)
  }
  if (cost < best) {
    best = cost
  }
}


console.log(best)
