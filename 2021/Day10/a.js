const input = require('../../loader').split('\n')

const matching = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<'
}

const weights = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

let sum = 0
for (const line of input) {
  let points = 0
  const chunks = []
  for (const char of line) {
    if ('([{<'.includes(char)) {
      chunks.push(char)
    } else if (matching[char] == chunks[chunks.length - 1]) {
      chunks.pop()
    } else {
      points += weights[char]
      break
    }
  }
  sum += points
}

console.log(sum)
