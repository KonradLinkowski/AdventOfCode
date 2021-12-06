const input = require('../../loader')
const fish = input.split(',').map(Number)

const period = 7
const cycle = Array(period).fill(0)
const newFishes = Array(period).fill().map(() => [])

for (const f of fish) {
  cycle[f] += 1
}

for (let i = 0; i < 256; i += 1) {
  const index = i % period
  const toRemove = []
  for (const f in newFishes[index]) {
    const newFish = newFishes[index][f]
    if (newFish.ready) {
      cycle[index] += newFish.value
      toRemove.push(newFish)
    } else {
      newFish.ready = true
    }
  }
  while (toRemove.length) {
    const item = toRemove.pop()
    newFishes[index].splice(item, 1)
  }
  const day = cycle[i % period]
  const newFishIndex = (i + period + 2) % period

  newFishes[newFishIndex].push({
    value: day,
    ready: false,
  })
}

console.log(cycle.reduce((s, c) => s + c) + newFishes.reduce((s, c) => s + c.reduce((p, d) => p + d.value, 0), 0))
