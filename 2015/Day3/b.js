const directions = require('../../loader').split('').map(d => {
  const map = {
    '>': { x: 1, y: 0 },
    '<': { x: -1, y: 0 },
    '^': { x: 0, y: -1 },
    'v': { x: 0, y: 1 }
  }
  return map[d]
})

const visited = {}
const santa = { x: 0, y: 0 }
const roboSanta = { x: 0, y: 0 }
directions.forEach(({ x, y }, i) => {
  const s = i & 1 ? roboSanta: santa
  s.x += x
  s.y += y
  visited[`${s.x}|${s.y}`] = true
})

const num = Object.keys(visited).length
console.log(num)
