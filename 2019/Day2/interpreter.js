class Interpreter {
  constructor(code) {
    this.code = [...code]
    this.index = 0
    this.finish = false
  }

  result() {
    return this.code[0]
  }

  run() {
    while (!this.finish) {
      const val = this.consume()
      const states = {
        1: this.add.bind(this),
        2: this.mul.bind(this),
        99: this.end.bind(this)
      }
      states[val]()
    }
    return this
  }

  consume() {
    const val = this.code[this.index]
    this.index += 1
    return val
  }

  add() {
    const a = this.code[this.consume()]
    const b = this.code[this.consume()]
    const ind = this.consume()
    this.code[ind] = a + b
  }

  mul() {
    const a = this.code[this. consume()]
    const b = this.code[this.consume()]
    const ind = this.consume()
    this.code[ind] = a * b
  }

  end() {
    this.finish = true
  }
}

module.exports = { Interpreter }
