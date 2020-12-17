const input = require('../../loader').split('\n')
const n = input.length * 7
let grid = Array(n).fill(0).map(() => Array(n).fill(0).map(() => Array(n).fill(false)))
const offset = {
  x: (n / 2 - input[0].length) | 0,
  y: (n / 2 - input.length) | 0,
  z: (n / 2 - input[0].length) | 0
}
input.forEach((line, y) => line.split('').forEach((cell, x) => {
  grid[offset.z][offset.y + y][offset.x + x] = cell == '#'
}))

for (let i = 0; i < 6; i += 1) {
  grid = grid.map((square, cZ) => square.map((line, cY) => line.map((cell, cX) => {
    let len = 0
    for (let z = -1; z <= 1; z += 1) {
      const cellZ = cZ + z
      if (cellZ < 0 || cellZ >= n) continue
      for (let y = -1; y <= 1; y += 1) {
        const cellY = cY + y
        if (cellY < 0 || cellY >= n) continue
        for (let x = -1; x <= 1; x += 1) {
          if (x == 0 && y == 0 && z == 0) continue
          const cellX = cX + x
          if (cellX < 0 || cellX >= n) continue
          len += grid[cellZ][cellY][cellX]
        }
      }
    }
    return cell && (len == 2 || len == 3) || !cell && len == 3
  })))
  const sum = grid.reduce((sum, square) => sum + square.reduce((sum, line) => sum + line.reduce((sum, cell) => sum + cell, 0), 0), 0)
  console.log(sum)
}

