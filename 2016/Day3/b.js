const numbers = require('../../loader').match(/\d+/g).map(Number)

const triangles = [...Array(3).keys()]
  .map(j => numbers.filter((_, i) => i % 3 == j))
  .flatMap(list => [...Array(list.length / 3).keys()].map(i => list.slice(i * 3, i * 3 + 3)))

const valid = triangles.filter(validate)

console.log(valid.length)

function validate([a, b, c]) {
  return a + b > c && a + c > b && b + c > a
}
