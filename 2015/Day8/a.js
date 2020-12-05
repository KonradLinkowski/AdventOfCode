const strings = require('../../loader').split('\n')
let sum = 0
strings.forEach(str => {
  const parsed = str.replace(/\\"/g, '"').replace(/\\x[0-9a-f]{2}/g, '0').replace(/\\\\/g, '\\')
  const s = str.length - parsed.length + 2
  sum += s
})

console.log(sum)
