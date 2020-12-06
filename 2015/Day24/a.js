const { get } = require("http")

const [row, column] = require('../../loader').match(/\d+/g).map(BigInt)
console.log(row, column)
const index = getIndex(row, column)
console.log(index)

const mul = 252533n
const mod = 33554393n
let calc = 20151125n
for (let i = 0n; i < index - 1n; i += 1n) {
  calc = calc * mul % mod
}
console.log(calc)

function getIndex(row, column) {
  return (row ** 2n + 2n * row * column - 3n * row + column ** 2n - column + 2n) / 2n
}
