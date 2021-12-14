const input = require('../../loader').split('\n\n')
const polymer = input[0]
const lines = input[1].split('\n')

const rules = lines.reduce((rules, line) => {
  const l = line.slice(0, 2)
  const r = line[line.length - 1]
  rules[l] = [l[0] + r, r + l[1]]
  return rules
}, {})

let counts = {}
for (let i = 0; i < polymer.length - 1; i += 1) {
  const str = polymer.slice(i, i + 2)
  if (str in counts) {
    counts[str] += 1
  } else {
    counts[str] = 1
  }
}

for (let step = 0; step < 40; step += 1) {
  const newCounts = {}
  for (const pair in counts) {
    for (const rule of rules[pair]) {
      if (rule in newCounts) {
        newCounts[rule] += counts[pair]
      } else {
        newCounts[rule] = counts[pair]
      }
    }
  }
  counts = newCounts
}

const result = {
  [polymer[0]]: 1,
};
for (const pair in counts) {
  const r = pair[1]
  if (r in result) {
    result[r] += counts[pair]
  } else {
    result[r] = counts[pair]
  }
}

const values = Object.values(result)

const min = Math.min(...values)
const max = Math.max(...values)

console.log(max - min)
