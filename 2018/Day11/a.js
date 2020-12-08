const serial = +require('../loader')

const grid = [...Array(300).keys()].map(y => [...Array(300).keys()].map(x => {
  const rackID = x + 1 + 10
  let powerLevel = rackID * (y + 1)
  powerLevel += serial
  powerLevel *= rackID
  const hundreds = powerLevel / 100 % 10 | 0
  return hundreds - 5
}))

const best = {
  x: Infinity,
  y: Infinity,
  val: 0
}

for (let y = 0; y < grid.length - 3; y += 1) {
  for (let x = 0; x < grid[y].length - 3; x += 1) {
    const s = get3(x, y)
    if (s > best.val) {
      best.val = s
      best.x = x
      best.y = y
    }
  }
}

console.log(`${best.x + 1},${best.y + 1}`)

function get3(x, y) {
  let sum = 0
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      sum += grid[y + i][x + j]
    }
  }
  return sum
}
