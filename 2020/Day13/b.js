const input = require("../../loader").split('\n')
const buses = input[1].split(',').map((bus, index) => (bus == 'x' ? null : { bus: BigInt(bus), index: BigInt(index) })).filter(b => b)

const a = buses.map(b => (b.bus - b.index) % b.bus)
const n = buses.map(b => b.bus)

const result = chineseRemainder(a, n)

console.log(result)

function chineseRemainder(a, n) {
  const prod = n.reduce((m, c) => m * c, 1n)
  let sum = 0n
  for (const i in n) {
    const p = prod / n[i]
    sum += a[i] * multInv(p, n[i]) * p
  }
  return sum % prod
}

function multInv(a, b) {
  if (b == 1) return 1n
  let aa = a
  let bb = b
  let x0 = 0n
  let x1 = 1n
  while (aa > 1n) {
    const q = aa / bb
    let t = bb
    bb = aa % bb
    aa = t
    t = x0
    x0 = x1 - q * x0
    x1 = t
  }
  if (x1 < 0n) x1 += b
  return x1
} 
