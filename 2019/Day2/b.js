const input = require('../../loader')
const code = input.split(',').map(Number)

const { Interpreter } = require('./interpreter')

main:
for (let i = 1; i < 100; i += 1) {
  for (let j = 1; j < 100; j += 1) {
    code[1] = i
    code[2] = j
    const val = new Interpreter(code).run().result()
    if (val == 19690720) {
      const result = 100 * i + j
      console.log(result)
      break main
    }
  }
}
