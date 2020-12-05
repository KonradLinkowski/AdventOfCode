const passes = require('../../loader').split('\n')
  .map(pass => pass.replace(/B|R/g, 1).replace(/F|L/g, 0))
  .map(pass => parseInt(pass.slice(0, 7), 2) * 8 + parseInt(pass.slice(7), 2))

console.log(Math.max(...passes))
