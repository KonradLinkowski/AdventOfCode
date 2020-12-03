const data = require('../../loader').split('\n').map(line => line.split(')'))

const orbits = build('COM')
console.log(orbits)

function build(name, orbits = 0) {
  const children = data.filter(d => d[0] == name).map(d => d[1])
  let sum = 0
  children.forEach(child => {
    sum += build(child, orbits + 1)
  })
  return sum + orbits
}
