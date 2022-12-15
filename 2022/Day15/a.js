const beacons = {}
const info = require('../../loader').split('\n').map(line => {
  const [x, y, bx, by] = line.match(/\d+/g).map(Number)
  const distance = Math.abs(x - bx) + Math.abs(y - by)
  beacons[bx + ':' + by] = { x: bx, y: by }
  return { x, y, distance }
})


const minX = Math.min(...info.map(item => item.x - item.distance))
const maxX = Math.max(...info.map(item => item.x + item.distance))

let count = 0
const y = 2000000
for (let x = minX; x <= maxX; x += 1) {
  if ((x + ':' + y) in beacons) continue
  if (info.some(sensor => {
    const distance = Math.abs(sensor.x - x) + Math.abs(sensor.y - y)
    return distance <= sensor.distance
  })) {
    count += 1
  }
}

console.log(count)
