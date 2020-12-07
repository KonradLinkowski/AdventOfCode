const nameRegex = /[a-z]+ [a-z]+/
const reg = /(?:(\d+) ([a-z]+ [a-z]+))+/g
const bags = require('../../loader').split('\n').map(line => {
  const name = line.match(nameRegex)[0]
  const children = [...line.matchAll(reg)]
    .map(([, quantity, name]) => ({ quantity: +quantity, name }))

  return { name, children }
})

const count = countChildren('shiny gold', bags)

console.log(count)

function countChildren(name, bags) {
  const root = find(name)
  const sum = req(root)
  return sum - 1

  function req(bag) {
    let sum = 1
    bag.children.forEach(child => {
      const b = find(child.name)
      sum += child.quantity * req(b)
    })
    return sum
  }

  function find(name) {
    return bags.find(bag => bag.name == name)
  }
}
