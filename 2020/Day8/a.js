const code = require('../../loader').split('\n').map(line => {
  const [op, ...params] = line.split(' ')
  return { line, times: 0, op, params }
})

let acc = 0
let index = 0

const ops = {
  acc: val => acc += +val,
  nop: () => {},
  jmp: ind => index += +ind - 1
}

while (true) {
  const line = code[index]
  if (line.times) {
    break
  }
  ops[line.op](...line.params)
  line.times += 1
  index += 1
}

console.log(acc)
