const groups = require('../../loader').split('\n\n')
  .map(group => group.match(/[a-z]/g))

const unique = groups.map(g => new Set(g))

const sum = unique.reduce((s, g) => s + g.size, 0)

console.log(sum)
