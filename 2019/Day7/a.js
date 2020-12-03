const input = require('../../loader')
const code = input.split(',').map(Number)

const { Interpreter } = require('./interpreter')

const results = []


for (const n of permute()) {
  let pipe = 0
  for (const a of n) {
    pipe = new Interpreter(code, [a, pipe]).run().result()
  }
  results.push({
    seq: n,
    val: pipe
  })
}

console.log(results.sort((a, b) => b.val - a.val)[0].val)

function* permute() {
  const a = [0, 1, 2, 3, 4]
  yield* req(a, 0, a.length - 1)
  function* req(a, l, r) {
    if (l == r) {
      yield a
    } else {
      for (let i = l; i <= r; i += 1) {
        swap(a, l, i)
        yield* req(a, l + 1, r)
        swap(a, l, i)
      }
    }
  }

  function swap(a, f, s) {
    const c = a[f]
    a[f] = a[s]
    a[s] = c
  }
}
