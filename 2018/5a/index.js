const input = require('../loader')
const array = input.split('')
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

console.log(array.length)

//areSameTypeAndOpposite
function ASTAO(a, b) {
  if (a.toLowerCase() === b.toLowerCase() && a !== b) {
    return true
  }
  return false
}