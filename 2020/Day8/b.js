const script = require('../../loader').split('\n').map(line => {
  const [op, ...params] = line.split(' ')
  return { line, times: 0, op, params }
})

for (const code of getCode(script)) {
  const acc = checkCode(code)
  if (acc) {
    console.log(acc)
    break
  }
}

function checkCode(code) {
  let acc = 0
  let index = 0

  const ops = {
    acc: val => acc += +val,
    nop: () => {},
    jmp: ind => index += +ind - 1
  }

  while (index < code.length) {
    const line = code[index]
    if (line.times) {
      return null
    }
    ops[line.op](...line.params)
    line.times += 1
    index += 1
  }
  return acc
}

function* getCode(code) {
  const indexes = code.map((line, index) => ['nop', 'jmp'].includes(line.op) ? index : null).filter(index => index != null)
  for (const index of indexes) {
    const newCode = code.map(line => ({ ...line }))
    newCode[index].op = newCode[index].op == 'nop' ? 'jmp' : 'nop'
    yield newCode
  }
}
