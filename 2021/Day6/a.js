const input = require('../../loader')
const fish = input.split(',').map(Number)

for (let i = 0; i < 80; i += 1) {
  const toAdd = []
  for (const i in fish) {
    if (fish[i] == 0) {
      fish[i] = 7
      toAdd.push(8)
    }
    fish[i] -= 1
  }
  while (toAdd.length) {
    const f = toAdd.pop()
    fish.push(f)
  }
}

console.log(fish.length)
