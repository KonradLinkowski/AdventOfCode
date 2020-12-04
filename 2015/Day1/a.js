const input = require('../../loader').split('').reduce((f, p) => f + (p == ')' ? -1 : 1), 0)

console.log(input)
