const input = require('../loader')
const ids = input.split('\n')
let twos = 0, threes = 0
ids.forEach(id => {
  const count = {}
  id.split('').forEach(l => {
    if (count[l] === undefined) {
      count[l] = 1
    } else {
      count[l] += 1
    }
  })
  if (Object.values(count).some(c => c === 2)) {
    twos += 1
  }
  if (Object.values(count).some(c => c === 3)) {
    threes += 1
  }
})
console.log(threes * twos)