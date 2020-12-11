const ferry = require('../../loader').split('\n').map((line, y) => line.split('').map((cell, x) => {
  if (cell == '.') return null
  return { empty: true, x, y, adjs: [] }
}))

setAdjs(ferry)

const seats = ferry.flat().filter(Boolean)

let changes = false
do {
  changes = false
  for (const seat of seats) {
    if (seat.empty && seat.adjs.every(s => s.empty)) {
      seat.next = false
    } else if (!seat.empty && seat.adjs.reduce((s, c) => s + !c.empty, 0) >= 5) {
      seat.next = true
    }
  }
  
  for (const seat of seats) {
    if (typeof seat.next == 'boolean') {
      seat.empty = seat.next
      seat.next = null
      changes = true
    }
  }
} while (changes)

const sum = seats.reduce((sum, seat) => sum + !seat.empty, 0)
console.log(sum)

function setAdjs(ferry) {
  for (let y = 0; y < ferry.length; y += 1) {
    for (let x = 0; x < ferry[y].length; x += 1) {
      if (!ferry[y][x]) continue
      ferry[y][x].adjs = getAdjs(ferry, x, y)
    }
  }
}

function getAdjs(ferry, x, y) {
  const adjs = [
    () => { for (let i = x + 1; i < ferry[y].length; i += 1) if (ferry[y][i]) return ferry[y][i] },
    () => { for (let i = x - 1; i >= 0; i -= 1) if (ferry[y][i]) return ferry[y][i] },
    () => { for (let i = y + 1; i < ferry.length; i += 1) if (ferry[i][x]) return ferry[i][x] },
    () => { for (let i = y - 1; i >= 0; i -= 1) if (ferry[i][x]) return ferry[i][x] },
    () => { for (let i = y + 1, j = x + 1; i < ferry.length && j < ferry[i].length; i += 1, j += 1) if (ferry[i][j]) return ferry[i][j] },
    () => { for (let i = y + 1, j = x - 1; i < ferry.length && j >= 0; i += 1, j -= 1) if (ferry[i][j]) return ferry[i][j] },
    () => { for (let i = y - 1, j = x + 1; i >= 0 && j < ferry[i].length; i -= 1, j += 1) if (ferry[i][j]) return ferry[i][j] },
    () => { for (let i = y - 1, j = x - 1; i >= 0 && j >= 0; i -= 1, j -= 1) if (ferry[i][j]) return ferry[i][j] }
  ].map(f => f()).filter(Boolean)

  return adjs
}

function print(ferry) {
  const s = ferry.map(s => s.map(s => {
    if (!s) return '.'
    if (s.empty) return 'L'
    return '#'
  }).join('')).join('\n')
  console.log(s, '\n')
}
