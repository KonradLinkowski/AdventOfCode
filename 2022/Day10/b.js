const data = require('../../loader');
const instructions = data.split('\n')

const ticks = []
let register = 1
for (const instruction of instructions) {
  const [instr, value] = instruction.split(' ')
  if (instr === 'noop') {
    ticks.push(register)
  } else {
    ticks.push(register)
    ticks.push(register)
    register += +value
  }
}


const crt = []

for (let i = 0; i < 40 * 6; i += 1) {
  const tick = ticks[i]
  if ([-1, 0, 1].some(p => tick + p === i % 40)) {
    crt.push('#')
  } else {
    crt.push('.')
  }
}

const result = []
for (let i = 0; i < 6; i += 1) {
  result.push(crt.slice(40 * i, 40 * i + 40).join(''))
}

console.log(result.join('\n'))
