const input = require('../loader')
const mainArray = input.split('')

const result = []

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
for (const l of alphabet) {
  const array = mainArray.filter(e => e !== l && e !== l.toUpperCase())
  let i = 0
  while (i != array.length - 1) {
    if (ASTAO(array[i], array[i + 1])) {
      array.splice(i, 2)
      i -= 1
    } else {
      i += 1
    }
    if (i < 0) i = 0
  }

  result.push({
    length: array.length,
    letter: l
  })
}

let best = { length: 50000, letter: '' }
result.forEach(e => {
  if (e.length < best.length) {
    best = e
  }
})

console.log(best.length)

//areSameTypeAndOpposite
function ASTAO(a, b) {
  if (a.toLowerCase() === b.toLowerCase() && a !== b) {
    return true
  }
  return false
}