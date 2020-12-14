const input = require("../../loader").split('\n')

let mask = null
const regs = {}

input.forEach(line => {
  if (line.startsWith('mask')) {
    mask = line.match(/[X01]+/)[0].split('')
    .map((val, ind) => (val != '0' ? { val, ind } : null)).filter(Boolean)
  } else {
    const matches = line.match(/(\d+).*?(\d+)/)
    const reg = +matches[1]
    const val = +matches[2]
    const str = reg.toString(2).padStart(36, 0)
    const arr = str.split('')
    mask.forEach(({ ind, val: v }) => arr[ind] = v)
    const xs = arr.map((v, ind) => ({ v, ind })).filter(a => a.v == 'X')
    if (xs.length) {
      for (const va of variate(xs.length)) {
        const newArr = [...arr]
        xs.forEach(({ v, ind }, i) => {
          newArr[ind] = va[i]
        })
        const result = parseInt(newArr.join(''), 2)
        regs[result] = val
      }
    } else {
      const result = parseInt(arr.join(''), 2)
      regs[result] = val
    }
  }
})

console.log(Object.values(regs).reduce((s, v) => s + v, 0))

function* variate(n) {
  yield* req()

  function* req(s = '', d = 0) {
    if (d == n) {
      yield s
      return
    }
    yield* req(s + '0', d + 1)
    yield* req(s + '1', d + 1)
  }
}

