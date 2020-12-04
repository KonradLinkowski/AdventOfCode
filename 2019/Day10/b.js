const map = require('../../loader').split('\n')
const asteroids = map.flatMap((row, y) => row.split('').map((o, x) => (o == '#' ? { x, y } : null))).filter(Boolean)

const coords = { x: 20, y: 19 }
const main = asteroids.find(a => a.x == coords.x && a.y == coords.y)


let destroyed = 0
main:
while (asteroids.length > 1) {
  const seen = getSeen(main)
  seen.sort((a, b) => a.angle - b.angle)

  for (const s of seen) {
    destroyed += 1
    if (destroyed == 200) {
      console.log(s)
      console.log(s.x * 100 + s.y)
      break main
    }
    const index = asteroids.findIndex(a => a.x == s.x && a.y == s.y)
    asteroids.splice(index, 1)
  }
}


function getSeen(ast) {
  const seen = []
  asteroids.forEach(sec => {
    if (ast == sec) return
    sec.angle = trueAngle(ast, sec)
    const ind = seen.findIndex(a => a.angle == sec.angle)
    if (!~ind) {
      seen.push(sec)
    } else {
      const dup = seen[ind]

      if (distance(ast, sec) < distance(ast, dup)) {
        seen.push(sec)
        seen.splice(ind, 1)
      }
    }
  })
  return seen
}

function trueAngle(f, s) {
  const ang = angle(f, s)
  const atan = Math.atan2(ang.y, ang.x) + Math.PI / 2
  return (atan >= 0 ? atan : Math.PI * 2 + atan) * 180 / Math.PI
}

function angle(f, s) {
  return { x: s.x - f.x, y: s.y - f.y }
}

function distance(f, s) {
  return Math.hypot(s.x - f.x, s.y - f.y)
}
