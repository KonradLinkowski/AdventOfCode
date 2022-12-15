const info = require('../../loader').split('\n')
const sensors = info.map(line => {
  const [x, y, bx, by] = line.match(/-?\d+/g).map(Number)
  const distance = Math.abs(x - bx) + Math.abs(y - by)
  return { x, y, distance }
})


const bounds = 4000000

const coefs = []

for (const { x, y, distance } of sensors) {
  coefs.push(y - x + distance + 1)
  coefs.push(y - x - distance - 1)
  coefs.push(x + y + distance + 1)
  coefs.push(x + y - distance - 1)
}

main:
for (const a of coefs) {
  for (const b of coefs) {
    const p = { x: Math.floor((b - a) / 2), y: Math.floor((a + b) / 2) }
    if (p.x <= 0 || p.x > bounds || p.y <= 0 || p.y > bounds) continue
    const match = sensors.every(scanner => {
      const distance = Math.abs(scanner.x - p.x) + Math.abs(scanner.y - p.y)
      return distance > scanner.distance
    })
    if (match) {
      console.log(p.x * bounds + p.y)
      break main
    }
  }
}
