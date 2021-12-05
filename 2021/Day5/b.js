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


const map = Array(maxY + 1).fill(0).map(e => Array(maxX + 1).fill(0))

for (const line of lines) {
  const [first, second] = line
  const [x1, y1] = first
  const [x2, y2] = second
  if (x1 == x2) {
    const min = Math.min(y1, y2)
    const max = Math.max(y1, y2)
    for (let i = min; i <= max; i += 1) {
      map[i][x1] += 1
    }
  } else if (y1 == y2) {
    const min = Math.min(x1, x2)
    const max = Math.max(x1, x2)
    for (let i = min; i <= max; i += 1) {
      map[y1][i] += 1
    }
  } else {
    const minX = Math.min(x1, x2)
    const maxX = Math.max(x1, x2)
    const minY = Math.min(y1, y2)
    const maxY = Math.max(y1, y2)
    const len = maxX - minX
    if (x1 < x2 && y1 < y2) {
      for (let i = 0; i <= len; i += 1) {
        map[minY + i][minX + i] += 1
      }
    } else if (x1 < x2 && y1 > y2) {
      for (let i = 0; i <= len; i += 1) {
        map[maxY - i][minX + i] += 1
      }
    } else if (x1 > x2 && y1 < y2) {
      for (let i = 0; i <= len; i += 1) {
        map[minY + i][maxX - i] += 1
      }
    } else if (x1 > x2 && y1 > y2) {
      for (let i = 0; i <= len; i += 1) {
        map[maxY - i][maxX - i] += 1
      }
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
