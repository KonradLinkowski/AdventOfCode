let [a, b] = require('../../loader').match(/\d+/g)

const af = 16807
const bf = 48271
const mod = 2147483647

const mask = 2 ** 16 - 1

const avalids = []
const amask = 0b11

const bvalids = []
const bmask = 0b111

for (let i = 0; true; i += 1) {
  a = a * af % mod
  b = b * bf % mod

  if ((a & amask) == 0) {
    avalids.push(a)
  }

  if ((b & bmask) == 0) {
    bvalids.push(b)
  }

  if (Math.min(avalids.length, bvalids.length) > 5_000_000) {
    break
  }
}

let valid = 0

for (let i = 0; i < 5_000_000; i += 1) {
  if (i == 1055) {
    console.log(valid)
  }
  if ((avalids[i] & mask) == (bvalids[i] & mask)) {
    valid += 1
  }
  if (i == 1055) {
    console.log(valid)
  }
}

console.log(valid)