const instructions = require('../../loader').split(', ').map(a => [a.slice(0, 1), +a.slice(1)])

const pos = { x: 0, y: 0, dir: 'N' }

instructions.forEach(([cur, len]) => {
  changeDir(cur)
  move(len)
})

console.log(getDist())

function getDist() {
  return pos.x + pos.y
}

function changeDir(cur) {
  const machine = {
    'N': {
      'L': 'W',
      'R': 'E'
    },
    'E': {
      'L': 'N',
      'R': 'S'
    },
    'S': {
      'L': 'E',
      'R': 'W'
    },
    'W': {
      'L': 'S',
      'R': 'N'
    }
  }
  
  pos.dir = machine[pos.dir][cur]
}

function move(len) {
  const machine = {
    'N': l => pos.y += l,
    'S': l => pos.y -= l,
    'E': l => pos.x += l,
    'W': l => pos.x -= l
  }
  
  machine[pos.dir](len)
}
