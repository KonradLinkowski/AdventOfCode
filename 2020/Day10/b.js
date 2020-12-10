const adapters = require('../../loader').split('\n').map(Number).sort((a, b) => a - b)

adapters.unshift(0)

const relations = {}

for (let i = 0; i < adapters.length; i += 1) {
  const adapter = adapters[i]
  relations[adapter] = { jumps: [] }
  for (let j = 1; j <= 3; j += 1) {
    if (i + j >= adapter.length) break
    const nextAdapter = adapters[i + j]
    if (nextAdapter <= adapter + 3) {
      relations[adapter].jumps.push(nextAdapter)
    }
  }
}

const list = Object.entries(relations).reverse()

for (const [adapter, rel] of list) {
  const sum = rel.jumps.reduce((s, c) => s + relations[c].val, 0)
  relations[adapter].val = sum || 1
}

console.log(relations[0].val)
