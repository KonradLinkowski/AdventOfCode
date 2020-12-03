const input = require('../../loader')
const code = input.split(',').map(Number)

const { Interpreter } = require('./interpreter')

const inputs = [1]

const val = new Interpreter(code, inputs).run().result()
console.log(val)
