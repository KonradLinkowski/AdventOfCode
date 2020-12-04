const { buildGraph } = require('./graph')

const edges = require('../loader').split('\n').map(d => d.match(/\b\w\b/g))
console.log(edges)

const graph = buildGraph(edges)

console.log(graph.toString())

const directions = []

while (graph.size()) {
  const roots = graph.findRoots().sort((a, b) => a.name.localeCompare(b.name))
  directions.push(roots[0].name)
  graph.removeVertex(roots[0])
}

console.log(directions.join(''))
