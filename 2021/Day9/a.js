const input = require('../../loader').split('\n').map(x => x.split('').map(Number))

let risk = 0

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
    risk += cell + 1
  }
}

console.log(risk)
