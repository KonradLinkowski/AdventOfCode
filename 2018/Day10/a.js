const stars = require('../loader').split('\n').map(line => {
  const [posX, posY, velX, velY] = line.match(/-?\d+/g).map(Number)
  return {
    pos: { x: posX, y: posY },
    vel: { x: velX, y: velY }
  }
})

console.log(stars)

for (let i = 1; true; i += 1){
  if (iterate(stars)) {
    console.log(i)
    break
  }
}

function iterate(stars) {
  move(stars)
  const c = calc(stars)
  if (c) {
    draw(stars, c)
    return true
  }
}

function move(stars) {
  stars.forEach(star => {
    star.pos.x += star.vel.x
    star.pos.y += star.vel.y
  })
}

function calc(stars) {
  const xs = stars.map(s => s.pos.x)
  const ys = stars.map(s => s.pos.y)

  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const maxX = Math.max(...xs)
  const maxY = Math.max(...ys)

  const height = Math.abs(maxY - minY)
  
  if (height < 15) {
    return { minX, maxX, minY, maxY }
  }

  return false
}

function draw(stars, { minX, maxX, minY, maxY }) {
  for (let y = minY; y <= maxY; y += 1) {
    const line = []
    for (let x = minX; x <= maxX; x += 1) {
      const star = stars.find(star => star.pos.x == x && star.pos.y == y)
      line.push(star ? '#' : ' ')
    }
    console.log(line.join(''))
  }
}
