const input = require('../../loader')
const code = input.split(',').map(Number)

code[1] = 12
code[2] = 2

const { Interpreter } = require('./interpreter')

const val = new Interpreter(code).run().result()
console.log(val)
