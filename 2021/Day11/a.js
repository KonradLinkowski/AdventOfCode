const input = require('../../loader').split('\n').map(e => e.split('').map(Number))

const dirs = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 }
]

const map = [...input.map(e => [...e].map(e => ({ value: e })))]

for (let y = 0; y < map.length; y += 1) {
  for (let x = 0; x < map[y].length; x += 1) {
    const item = get(x, y)
    item.adjs = dirs.map(d => get(x + d.x, y + d.y)).filter(e => e)
    item.x = x
    item.y = y
  }
}


let flashes = 0
for (let i = 0; i < 100; i += 1) {  
  for (const row of map) {
    for (const cell of row) {
      cell.value += 1
    }
  }
  
  const lighten = []
  const queue = []
  for (const row of map) {
    for (const cell of row) {
      if (cell.value <= 9) continue
      if (lighten.includes(cell)) continue
      if (queue.includes(cell)) continue

      lighten.push(cell)
      queue.push(cell)
      while (queue.length) {
        const current = queue.shift()
        for (const adj of current.adjs) {
          adj.value += 1
          if (adj.value > 9 && !lighten.includes(adj) && !queue.includes(adj)) {
            queue.push(adj)
            lighten.push(adj)
          }
        }
      }
    }
  }

  for (const l of lighten) {
    l.value = 0
  }

  flashes += lighten.length
}

console.log(flashes)

function get(x, y) {
  if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
    return null
  }
  return map[y][x]
}
