const input = require('../../loader')
const numbers = input.split('\n').map(Number)
let count = 0
for (let i = 1; i < numbers.length; i += 1) {
  if (numbers[i] > numbers[i - 1]) {
    count += 1
  }
}
console.log(count)
