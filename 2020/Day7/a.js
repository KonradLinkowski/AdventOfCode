const nameRegex = /[a-z]+ [a-z]+/
const reg = /(?:(\d+) ([a-z]+ [a-z]+))+/g
const bags = require('../../loader').split('\n').map(line => {
  const name = line.match(nameRegex)[0]
  const children = [...line.matchAll(reg)]
    .map(([, quantity, name]) => ({ quantity: +quantity, name }))

  return { name, children }
})

const poss = getPossibleParents('shiny gold', bags)

console.log(poss.length - 1)

function getPossibleParents(name, bags) {
  const possibles = []
  req(name)
  return possibles

  function req(name) {
    possibles.push(name)
    const children = bags.filter(bag => bag.children.some(child => child.name == name))
    children.forEach(child => {
      if (!possibles.includes(child.name)) {
        req(child.name)
      }
    })
  }
}
