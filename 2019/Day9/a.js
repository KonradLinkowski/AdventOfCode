const map = require('../../loader').split('\n')
const asteroids = map.flatMap((row, y) => row.split('').map((o, x) => (o == '#' ? { x, y } : null))).filter(Boolean)

asteroids.forEach(calc)

asteroids.sort((a, b) => b.seen - a.seen)
console.log(asteroids[0])

function calc(ast, i) {
  ast.seen = {}
  asteroids.forEach((sec, j) => {
    if (i == j) return
    const ang = angle(ast, sec)
    const a = reduce(ang)
    if ((a.x != (a.x | 0)) || (a.y != (a.y | 0))) {
      throw `${a.x} ${a.y}`
    }
    const str =`${a.x}#${a.y}`
    if (!ast.seen[str]) {
      ast.seen[str] = ang
    }
  })
  ast.seen = Object.keys(ast.seen).length
}

function angle(f, s) {
  return { x: s.x - f.x, y: s.y - f.y }
}

function reduce({ x, y }) {
  if (Math.abs(x) == 1 || Math.abs(y) == 1) {
    return { x, y }
  }

  const g = gcd(x, y)
  const c = g < 0 ? -1 : 1
  return { x : x / g * c, y: y / g * c }
}

function gcd(a, b) {
  let c
  while (b != 0)  {
    c = a
    a = b
    b = c % b
  }
  return a
}
