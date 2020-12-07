let [a, b] = require('../../loader').match(/\d+/g)

const af = 16807
const bf = 48271
const mod = 2147483647

let valid = 0
const mask = 2 ** 16 - 1

for (let i = 0; i < 40_000_000; i += 1) {
  a = a * af % mod
  b = b * bf % mod
  if ((a & mask) == (b & mask)) {
    valid += 1
  }
}

console.log(valid)