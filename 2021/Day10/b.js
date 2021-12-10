const input = require('../../loader').split('\n')

const matching = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<'
}

const counter = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const weights = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

const sum = []
main:
for (const line of input) {
  const chunks = []
  for (const char of line) {
    if ('([{<'.includes(char)) {
      chunks.push(char)
    } else if (matching[char] == chunks[chunks.length - 1]) {
      chunks.pop()
    } else {
      continue main
    }
  }
  let points = 0
  while (chunks.length) {
    const char = counter[chunks.pop()]
    points *= 5
    points += weights[char]
  }
  sum.push(points)
}

sum.sort((a, b) => a - b)

console.log(sum[sum.length / 2 | 0])
