const adapters = require('../../loader').split('\n').map(Number)
const result = adapters.sort((a, b) => a - b).reduce((result, acc) => {
  const diff = acc - result.last
  if (diff == 1) {
    result.ones += 1
  } else if (diff == 3) {
    result.threes += 1
  }
  result.last = acc
  return result
}, { ones: 0, threes: 1, last: 0 })

console.log(result.ones * result.threes)
