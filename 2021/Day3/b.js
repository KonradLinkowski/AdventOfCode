const input = require('../../loader')
let bits = input.split('\n')


const len = bits[0].length
let ox = [...bits]
for (let i = 0; i < len; i += 1) {
  let ones = 0
  for (const line of ox) {
    if (line[i] == '1') ones += 1
  }
  ox = ox.filter(b => b[i] == (ones >= ox.length / 2) ? 1 : 0)
  if (ox.length == 1) break
}

let co = [...bits]
for (let i = 0; i < len; i += 1) {
  let ones = 0
  for (const line of co) {
    if (line[i] == '1') ones += 1
  }
  co = co.filter(b => b[i] == (ones < co.length / 2) ? 1 : 0)
  if (co.length == 1) break
}

const o = parseInt(ox, 2)
const c = parseInt(co, 2)

console.log(o * c)
