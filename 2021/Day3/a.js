const input = require('../../loader')
const bits = input.split('\n')

let gamma = []
let epsilon = []
for (let i = 0; i < bits[0].length; i += 1) {
  let ones = 0
  for (const line of bits) {
    if (line[i] == '1') ones += 1
  }
  console.log(ones, bits.length)
  if (ones > bits.length / 2) {
    gamma[i] = 1
    epsilon[i] = 0
  } else {
    gamma[i] = 0
    epsilon[i] = 1
  }
}

const g = parseInt(gamma.join(''), 2)
const e = parseInt(epsilon.join(''), 2)
console.log(g * e)
