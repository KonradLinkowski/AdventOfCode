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
    } else if (!seat.empty && seat.adjs.reduce((s, c) => s + !c.empty, 0) >= 4) {
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
  const adjs = []
  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (i == 0 && j == 0) continue
      if (ferry[y + i] && ferry[y + i][x + j]) {
        adjs.push(ferry[y + i][x + j])
      }
    }  
  }
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
