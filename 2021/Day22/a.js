const steps = require('../../loader').split('\n').map(step => {
  const type = step.match(/on|off/)[0]
  const [minX, maxX, minY, maxY, minZ, maxZ] = step.match(/-?\d+/g).map(Number)
  return { type, minX, maxX, minY, maxY, minZ, maxZ }
}).reverse()

const constraints = {
  minX: Math.max(Math.min(...steps.map(step => step.minX)), -50),
  maxX: Math.min(Math.max(...steps.map(step => step.maxX)), 50),
  minY: Math.max(Math.min(...steps.map(step => step.minY)), -50),
  maxY: Math.min(Math.max(...steps.map(step => step.maxY)), 50),
  minZ: Math.max(Math.min(...steps.map(step => step.minZ)), -50),
  maxZ: Math.min(Math.max(...steps.map(step => step.maxZ)), 50),
}

console.log(constraints)

let count = 0

for (let x = constraints.minX; x <= constraints.maxX; x += 1) {
  for (let y = constraints.minY; y <= constraints.maxY; y += 1) {
    for (let z = constraints.minZ; z <= constraints.maxZ; z += 1) {
      for (const { minX, maxX, minY, maxY, minZ, maxZ, type } of steps) {
        if (x >= minX && x <= maxX && y >= minY && y <= maxY && z >= minZ && z <= maxZ) {
          if (type == 'on') {
            count += 1
          }
          break
        }
      }
    }
  }
}

console.log(count)
