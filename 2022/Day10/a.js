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

let sum = 0

for (let i = 20; i <= 220; i += 40) {
  const tick = ticks[i - 1] !== undefined ? ticks[i - 1] : register
  sum += tick * i
}

console.log(sum)
