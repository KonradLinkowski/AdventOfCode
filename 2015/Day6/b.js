const instructions = require('../../loader').split('\n').map(line => {
  const [_, command, x1, y1, x2, y2] = line.match(/(on|off|toggle).*?(\d+),(\d+).*?(\d+),(\d+)/)
  return { command, x1: +x1, y1: +y1, x2: +x2, y2: +y2 }
})

const grid = Array(1000).fill(0).map(() => Array(1000).fill(0))

instructions.forEach(execute)

console.log(getTurnedOn())

function getTurnedOn() {
  const s = (s, c) => s + c
  return grid.map(row => row.reduce(s)).reduce(s)
}

function execute({ command, x1, y1, x2, y2 }) {
  for (let y = y1; y <= y2; y += 1) {
    for (let x = x1; x <= x2; x += 1) {
      switch (command) {
        case 'on':
          grid[y][x] += 1
          break
        case 'off':
          grid[y][x] -= grid[y][x] == 0 ? 0 : 1
          break
        case 'toggle':
          grid[y][x] += 2
      }
    }
  }
}
