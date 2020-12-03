class Interpreter {
  constructor(code, inputs) {
    this.code = [...code]
    this.inputs = [...inputs]
    this.outputs = []
    this.index = 0
    this.finish = false
  }

  result() {
    return this.outputs[this.outputs.length - 1]
  }

  run() {
    const states = {
      1: this.add.bind(this),
      2: this.mul.bind(this),
      3: this.input.bind(this),
      4: this.output.bind(this),
      5: this.jumpIfTrue.bind(this),
      6: this.jumpIfFalse.bind(this),
      7: this.lessThan.bind(this),
      8: this.equals.bind(this),
      99: this.end.bind(this)
    }
    while (!this.finish) {
      const { code, modes } = this.opcode()
      states[code](modes)
    }
    return this
  }

  jumpIfTrue([am, bm]) {
    const val = am ? this.consume() : this.address()
    const dest = bm ? this.consume() : this.address()

    if (val) {
      this.index = dest
    }
  }

  jumpIfFalse([am, bm]) {
    const val = am ? this.consume() : this.address()
    const dest = bm ? this.consume() : this.address()

    if (!val) {
      this.index = dest
    }
  }

  lessThan([am, bm, cm = 1]) {
    const a = am ? this.consume() : this.address()
    const b = bm ? this.consume() : this.address()
    const dest = cm ? this.consume() : this.address()


    this.code[dest] = a < b ? 1 : 0
  }

  equals([am, bm, cm = 1]) {
    const a = am ? this.consume() : this.address()
    const b = bm ? this.consume() : this.address()
    const dest = cm ? this.consume() : this.address()

    
    this.code[dest] = a == b ? 1 : 0
  }

  opcode() {
    const str = this.consume().toString()
    const code = +str.substr(str.length - 2, 2)
    const modes = str.slice(0, str.length - 2)
    return {
      code,
      modes: modes.split('').reverse().map(Number)
    }
  }

  consume() {
    const val = this.code[this.index]
    this.index += 1
    return val
  }

  address() {
    const val = this.consume()
    return this.code[val]
  }

  add([aM, bM]) {
    const a = aM ? this.consume() : this.address()
    const b = bM ? this.consume() : this.address()
    const ind = this.consume()
    this.code[ind] = a + b
  }

  mul([aM, bM]) {
    const a = aM ? this.consume() : this.address()
    const b = bM ? this.consume() : this.address()
    const ind = this.consume()
    this.code[ind] = a * b
  }

  input() {
    const val = this.inputs.shift()
    const addr = this.consume()
    this.code[addr] = val
  }

  output([mode]) {
    const val = mode ? this.consume() : this.address()
    this.outputs.push(val)
  }

  end() {
    this.finish = true
  }

  print() {
    console.log(this.code.map((c, i) => `${i}: ${c}`))
  }
}

module.exports = { Interpreter }
