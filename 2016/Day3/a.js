const triangles  = require('../../loader').split('\n').map(l => l.match(/\d+/g).map(Number))

const valid = triangles.filter(validate)

console.log(valid.length)

function validate([a, b, c]) {
  return a + b > c && a + c > b && b + c > a
}
