const input = require('../loader')
const points = input.split('\n').map((e, i) => parse(e, i))
const size = Math.max(...input.split(/[\n,]/g)) + 1

const board = new Array(size).fill(0).map(e => new Array(size).fill(0))
points.forEach(p => {
  board[p.y][p.x] = p.id
})

const toRemove = new Set()

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    if (board[j][i] === 0) {
      const distances = []
      points.forEach(p => {
        distances.push({
          id: p.id,
          value: Math.abs(p.y - j) + Math.abs(p.x - i)
        })
      })
      const sorted = distances.sort((a, b) => a.value - b.value)
      if (sorted[0].value !== sorted[1].value) {
        if (i == 0 || i == size - 1 || j == 0 || j == size - 1) {
          toRemove.add(sorted[0].id)
        }
        board[j][i] = sorted[0].id
      }
    }
  }
}

const ignoring = [...toRemove]
const count = {}

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    let that = board[j][i]
    if (!ignoring.includes(that)) {
      if (count[that] === undefined) {
        count[that] = 0
      }
      count[that] += 1
    }
  }
}

console.log(Object.values(count).sort((a, b) => b - a)[0])


function parse(line, number) {
  const parts = line.split(',')
  return {
    id: number + 1,
    x: Number(parts[0]),
    y: Number(parts[1])
  }
}