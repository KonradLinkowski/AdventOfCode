const numbers = require('../../loader').split('\n').map(Number)

const preamble = 25

const invalid = findInvalid(numbers)

const set = findSet(numbers, invalid)
console.log(Math.min(...set) + Math.max(...set))

function findSet(numbers, invalid) {
  for (let i = 0; i < numbers.length - 1; i += 1) {
    const a = numbers[i]
    const set = [a]
    let sum = a
    for (let j = i + 1; j < numbers.length; j += 1) {
      const b = numbers[j]
      sum += b
      set.push(b)
      if (sum == invalid) return set
      if (sum > invalid) break
    }
  }
}

function findInvalid(numbers) {
  for (let i = preamble; i < numbers.length; i += 1) {
    const set = numbers.slice(i - preamble, i)
    if (!isSumOf(set, numbers[i])) {
      return numbers[i]
    }
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
