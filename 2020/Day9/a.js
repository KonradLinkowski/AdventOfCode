const numbers = require('../../loader').split('\n').map(Number)

const preamble = 25

for (let i = preamble; i < numbers.length; i += 1) {
  const set = numbers.slice(i - preamble, i)
  if (!isSumOf(set, numbers[i])) {
    console.log(numbers[i])
    break
  }
}


function isSumOf(numbers, num) {
  for (const a of numbers) {
    for (const b of numbers) {
      if (a == b) continue
      if (a + b == num) return true
    }
  }
  return false
}
