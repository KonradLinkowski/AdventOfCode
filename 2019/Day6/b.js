const data = require('../../loader').split('\n').map(line => line.split(')'))

const you = path('YOU')
const san = path('SAN')

console.log(mutual(you, san))

function mutual(p1, p2) {
  for (const i in p1) {
    for (const j in p2) {
      if (p1[i] == p2[j]) {
        return +i + +j
      }
    }
  }
}

function path(name, p = []) {
  if (name == 'COM') {
    return p
  }
  const parent = data.find(d => d[1] === name)[0]
  p.push(parent)
  return path(parent, p)
}
