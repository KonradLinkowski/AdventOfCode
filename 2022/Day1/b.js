const data = require('../../loader')
const elves = data.split('\n\n')
const sums = elves.map(elve => elve.split('\n').reduce((sum, c) => sum + +c, 0)).sort((a, b) => b - a)

console.log(sums[0] + sums[1] + sums[2])