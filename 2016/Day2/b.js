const instructions = require('../../loader').split('\n').map(l => l.split(''))

let current = 5
const code = []

instructions.forEach(line => {
  line.forEach(move)
  code.push(current)
})

console.log(code.join(''))


function move(dir) {
  const machine = {
    1: {
      D: 3
    },
    2: {
      R: 3,
      D: 6
    },
    3: {
      U: 1,
      L: 2,
      R: 4,
      D: 7
    },
    4: {
      L: 3,
      D: 8
    },
    5: {
      R: 6
    },
    6: {
      U: 2,
      L: 5,
      R: 7,
      D: 'A'
    },
    7: {
      U: 3,
      L: 6,
      R: 8,
      D: 'B'
    },
    8: {
      U: 4,
      L: 7,
      R: 9,
      D: 'C'
    },
    9: {
      L: 8
    },
    A: {
      U: 6,
      R: 'B'
    },
    B: {
      U: 7,
      L: 'A',
      R: 'C',
      D: 'D'
    },
    C: {
      U: 8,
      L: 'B'
    },
    D: {
      U: 'B'
    }
  }

  const next = machine[current][dir]

  current = next || current
}
