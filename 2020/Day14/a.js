const input = require("../../loader").split('\n')

let mask = null
const regs = {}

input.forEach(line => {
  if (line.startsWith('mask')) {
    mask = line.match(/[X01]+/)[0].split('')
    .map((val, ind) => (val != 'X' ? { val, ind } : null)).filter(Boolean)
  } else {
    const matches = line.match(/(\d+).*?(\d+)/)
    const reg = matches[1]
    const val = +matches[2]
    const str = val.toString(2).padStart(36, 0)
    const arr = str.split('')
    mask.forEach(({ ind, val: v }) => arr[ind] = v)
    const newVal = parseInt(arr.join(''), 2)
    regs[reg] = newVal
  }
})


console.log(Object.values(regs).reduce((s, v) => s + v))
