const input = require('../loader')
const numbers = input.split('\n').map(Number)
const result = numbers.reduce((p, c) => p + Math.floor(c / 3) - 2, 0)
console.log(result)
