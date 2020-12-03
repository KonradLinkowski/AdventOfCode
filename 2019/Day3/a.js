const { posix } = require('path')
const input = require('../../loader')
const directions = input.split('\n').map(p => p.split(',').map(s => {
  const [_, dir, len] = s.match(/([UDLR])(\d*)/)
  return { dir, len }
}))

const cache = {}


const paths = directions.map(dirs => {
  const pos = { x: 0, y: 0 }
  return dirs.flatMap(({ dir, len }) => go(pos, dir, len))
})

const intersections = []

paths[0].forEach((p1, i) => {
  paths[1].forEach(p2 => {
    if (p1 == p2) {
      intersections.push(p1)
    }
  })
})

intersections.forEach(int => {
  const dist = Math.hypot(int.x, int.y)
  int.dist = dist
})

const min = intersections.reduce((best, cur) => best.dist < cur.dist ? best : cur)

console.log(min.dist)

function go(pos, dir, len) {
  const path = []
  const sign = ['U', 'R'].includes(dir) ? 1 : -1
  for (let i = 1; i <= len; i += 1) {
    const p = get(
      ['U', 'D'].includes(dir) ? pos.x + i * sign : pos.x,
      ['L', 'R'].includes(dir) ? pos.y  + i * sign: pos.y
    )
    path.push(p)
  }
  pos.x = path[path.length - 1].x
  pos.y = path[path.length - 1].y
  return path
}

function get(x, y) {
  const s = `${x}-${y}`
  if (s in cache) {
    return cache[s]
  }
  const obj = { x, y }
  cache[s] = obj
  return obj
}
