const planets = require('../../loader').split('\n').map(p => {
  const [x, y, z] = p.match(/-?\d+/g).map(Number)
  return { position: { x, y, z }, velocity: { x: 0, y: 0, z: 0 } }
})

console.log(planets)

for (let i = 0; i < 1000; i += 1) {
  iterate(i)
}

const e = getTotalEnergy()
console.log(e)

function iterate(step) {
  calcGravity()
  movePlanets()
}

function getTotalEnergy() {
  return planets.reduce((sum, { position: p, velocity: v }) => {
    const a = Math.abs
    const pot = a(p.x) + a(p.y) + a(p.z)
    const kin = a(v.x) + a(v.y) + a(v.z)
    return sum + pot * kin
  }, 0)
}

function calcGravity() {
  for (let i = 0; i < planets.length - 1; i += 1) {
    for (let j = i; j < planets.length; j += 1) {
      const { position: p1, velocity: v1 } = planets[i]
      const { position: p2, velocity: v2 } = planets[j]
      for (const s of ['x', 'y', 'z']) {
        if (p1[s] < p2[s]) {
          v1[s] += 1
          v2[s] -= 1
        } else if (p1[s] > p2[s]) {
          v1[s] -= 1
          v2[s] += 1
        }
      }
    }
  }
}

function movePlanets() {
  planets.forEach(p => {
    p.position.x += p.velocity.x
    p.position.y += p.velocity.y
    p.position.z += p.velocity.z
  })
}
