const input = require('../../loader').split('\n').map(x => x.split('').map(Number))

const basins = []

for (let y = 0; y < input.length; y += 1) {
  row:
  for (let x = 0; x < input[y].length; x += 1) {
    const cell = input[y][x]
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (i == 0 && j == 0) continue
        const row = input[y + i]
        const c = row ? row[x + j] : null
        const adj = c ?? 10
        if (adj <= cell) continue row
      }
    }
    basins.push([{
      x, y, value: cell
    }])
  }
}

for (const basin of basins) {
  let index = 0
  while (index < basin.length) {
    const current = basin[index]
    const adjs = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }]
    for (const { x, y } of adjs) {
      const nX = current.x + x
      const nY = current.y + y
      if (nY < 0 || nY >= input.length) continue
      if (nX <  0 || nX >= input[nY].length) continue
      if (input[nY][nX] == 9) continue
      if (basin.find(e => e.x == nX && e.y == nY)) continue
      basin.push({ x: nX, y: nY, value: input[nY][nX] })
    }
    index += 1
  }
}

const lengths = basins.map(e => e.length).sort((a, b) => b - a)

console.log(lengths[0] * lengths[1] * lengths[2])
