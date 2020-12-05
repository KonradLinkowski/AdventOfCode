const input = require('../../loader')
const code = input.split('\n')

const { Interpreter } = require('./interpreter')

const val = new Interpreter(code).run().result()
console.log(val)
