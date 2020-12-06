const groups = require('../../loader').split('\n\n')
  .map(group => group.split('\n').map(p => p.split('')))

const sum = groups.map(every).reduce(add, 0)

console.log(sum)

function every(group) {
  const [per, ...rest] = group
  const yeses = per.map(a => rest.every(r => r.includes(a)))
  return yeses.reduce(add, 0)
}

function add(a, b) {
  return a + b
}
