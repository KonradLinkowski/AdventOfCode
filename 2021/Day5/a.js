const input = require('../../loader')
const lines = input.split('\n').map(line => line.split(' -> ').map(e => e.split(',').map(Number)))
let maxX = 0
let maxY = 0
for (const line of lines) {
  for (const [x, y] of line) {
    if (x > maxX) {
      maxX = x
    }
    if (y > maxY) {
      maxY = y
    }
  }
}

const vertHorz = lines.filter(([first, second]) => first[0] == second[0] || first[1] == second[1])

const map = Array(maxY + 1).fill(0).map(e => Array(maxX + 1).fill(0))

for (const line of vertHorz) {
  const [first, second] = line
  const [x1, y1] = first
  const [x2, y2] = second
  if (x1 == x2) {
    const min = Math.min(y1, y2)
    const max = Math.max(y1, y2)
    for (let i = min; i <= max; i += 1) {
      map[i][x1] += 1
    }
  } else {
    const min = Math.min(x1, x2)
    const max = Math.max(x1, x2)
    for (let i = min; i <= max; i += 1) {
      map[y1][i] += 1
    }
  }
}

let count = 0
for (const line of map) {
  for (const cell of line) {
    if (cell > 1) {
      count += 1
    }
  }
}

console.log(count)
