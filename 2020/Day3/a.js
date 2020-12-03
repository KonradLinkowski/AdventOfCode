const { off } = require('process')
const input = require('../../loader')
const lines = input.split('\n')

let offset = 0
let trees = 0
lines.forEach(line => {
  if (line[offset % line.length] == '#') {
    trees += 1
  }
  offset += 3
})

console.log(trees)
