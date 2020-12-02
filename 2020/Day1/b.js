const input = require('../../loader')
const numbers = input.split('\n').map(Number)
for (let i = 0; i < numbers.length - 1; i += 1) {
  for (let j = i + 1; j < numbers.length; j += 1) {
    for (let k = i + 1; k < numbers.length; k += 1) {
      if (numbers[i] + numbers[j] + numbers[k] == 2020) {
        return console.log(numbers[i] * numbers[j] * numbers[k])
      }
    }
  }
}
