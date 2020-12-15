const initial = require("../../loader").split(',').map(Number)
const cache = {}

initial.forEach((num, i) => cache[num] = i)
console.log('iniaitla', cache)

let last = initial[initial.length - 1]

const l = 30000000
for (let i = initial.length - 1; i < l - 1; i += 1) {
  const preLast = last
  if (last in cache) {
    const diff = i - cache[last]
    last = diff
  } else {
    last = 0
  }
  cache[preLast] = i
  if (i % 100000 == 0) {
    console.log(i / l * 100 | 0)
  }
}

console.log(last)
