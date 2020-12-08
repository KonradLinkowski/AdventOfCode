const serial = +require('../loader')

const len = 300

const grid = [...Array(len).keys()].map(y => [...Array(len).keys()].map(x => {
  const rackID = x + 1 + 10
  let powerLevel = rackID * (y + 1)
  powerLevel += serial
  powerLevel *= rackID
  const hundreds = powerLevel / 100 % 10 | 0
  return hundreds - 5
}))

const s3 = 30
// console.log(grid.slice(0, s3).map(line => line.slice(0, s3).map(e => e.toString().padStart(2, ' ')).join(' ')).join('\n'))

const best = {
  x: Infinity,
  y: Infinity,
  size: Infinity,
  val: 0
}

for (let y = 0; y < len; y += 1) {
  console.log(y)
  for (let x = 0; x < len; x += 1) {
    for (let i = 1; i <= len; i += 1) {
      if (y + i > len || x + i > len) break
      const s = getSum(x, y, i)
      if (s > best.val) {
        best.val = s
        best.x = x
        best.y = y
        best.size = i
      }
    }
  }
}

console.log(`${best.x + 1},${best.y + 1},${best.size}`)

function getSum(x, y, size) {
  let sum = 0
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      sum += grid[y + i][x + j]
    }
  }
  return sum
}
