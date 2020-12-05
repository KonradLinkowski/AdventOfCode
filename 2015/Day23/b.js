const input = require('../../loader')
const code = input.split('\n')

const { Interpreter } = require('./interpreter')

const val = new Interpreter(code, [1n, 0n]).run().result()
console.log(val)
