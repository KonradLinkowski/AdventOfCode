const input = require('../loader')
const points = input.split('\n').map((e, i) => parse(e, i))
const size = Math.max(...input.split(/[\n,]/g)) + 1

const board = new Array(size).fill(0).map(e => new Array(size).fill(0))

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const distances = []
    points.forEach(p => {
      distances.push({
        id: p.id,
        value: Math.abs(p.y - j) + Math.abs(p.x - i)
      })
    })
    const summed = distances.reduce((p, c) => p + c.value, 0)
    if (summed < 10000) {
      board[j][i] = '#'
    }
  }
}

let count = 0

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    if (board[j][i] === '#') {
      count += 1
    }
    
  }
}

console.log(count)


function parse(line, number) {
  const parts = line.split(',')
  return {
    id: number + 1,
    x: Number(parts[0]),
    y: Number(parts[1])
  }
}