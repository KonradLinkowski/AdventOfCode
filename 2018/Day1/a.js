const input = require('../loader')
const numbers = input.split('\n').map(n => Number(n))
const result = numbers.reduce((p, c) => p + c)
console.log(result)