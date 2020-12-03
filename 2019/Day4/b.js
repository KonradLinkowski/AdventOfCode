const range = require('../../loader').split('-').map(Number)

let valid = 0
for (let pass = range[0]; pass <= range[1]; pass += 1) {
  const s = pass.toString()
  if (ascending(s) && same(s)) {
    valid += 1
  }
}

console.log(valid)

function ascending(pass) {
  for (let i = 0; i < pass.length - 1; i += 1) {
    if (pass[i] > pass[i + 1]) {
      return false
    }
  }
  return true
}

function same(pass) {
  const matches = pass.match(/0+|1+|2+|3+|4+|5+|6+|7+|8+|9+/g)
  return matches.some(m => m.length == 2)
}
