const data = require('../../loader')
const elves = data.split('\n\n')
const sums = elves.map(elve => elve.split('\n').reduce((sum, c) => sum + +c, 0))
const max = Math.max(...sums)

console.log(max)