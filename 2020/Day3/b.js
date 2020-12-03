const { off } = require('process')
const input = require('../../loader')
const lines = input.split('\n')

const slp = (jump, drop = 1) => ({ offset: 0, jump, trees: 0, drop })

const slopes = [slp(1), slp(3), slp(5), slp(7), slp(1, 2)]

lines.forEach((line, i) => {
  slopes.forEach(s => {
    if (i % s.drop != 0) return
    if (line[s.offset % line.length] == '#') {
      s.trees += 1
    }
    s.offset += s.jump
  })
})

console.log(slopes.reduce((p, c) => p * c.trees, 1))
