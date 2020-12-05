const { openStdin } = require("process")

class Interpreter {
  constructor(code, registers = [0n, 0n]) {
    this.code = [...code]
    this.index = 0
    this.finish = false
    this.registers = [...registers]
  }

  result() {
    return [...this.registers]
  }

  run() {
    while (this.index < this.code.length) {
      const [op, ...params] = this.consume()
      this.execute(op, params)
    }
    return this
  }

  execute(op, params) {
    const ops = {
      jio: pipeline(this.jio),
      jie: pipeline(this.jie),
      jmp: pipeline(this.jmp),
      inc: pipeline(this.inc, this.incIndex),
      tpl: pipeline(this.tpl, this.incIndex),
      hlf: pipeline(this.hlf, this.incIndex)
    }
  
    ops[op](params)
  }

  consume() {
    const line = this.code[this.index]
    return this.parse(line)
  }

  inc = ([reg]) => {
    this.set(reg, this.get(reg) + 1n)
  }

  hlf = ([reg]) => {
    this.set(reg, this.get(reg) / 2n)
  }

  tpl = ([reg]) => {
    this.set(reg, this.get(reg) * 3n)
  }

  jmp = ([offset]) => {
    const num = +offset
    this.index += num
  }

  jio = ([reg, offset]) => {
    if (this.get(reg) == 1n) {
      this.jmp([offset])
    } else {
      this.incIndex()
    }
  }

  jie = ([reg, offset]) => {
    if (this.get(reg) % 2n == 0) {
      this.jmp([offset])
    } else {
      this.incIndex()
    }
  }

  parse(line) {
    return line.split(/ |, /g)
  }

  get(name) {
    const ind = name == 'a' ? 0 : 1
    return this.registers[ind]
  }

  set(name, val) {
    const ind = name == 'a' ? 0 : 1
    this.registers[ind] = val
  }

  incIndex = () => {
    this.index += 1
  }
}

function pipeline(...fns) {
  return (args) => fns.forEach(fn => fn(args))
}

module.exports = { Interpreter }
