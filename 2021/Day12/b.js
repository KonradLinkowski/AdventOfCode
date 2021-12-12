const edges = require('../../loader').split('\n').map(line => line.split('-'))

const vertices = {}

for (const edge of edges) {
  for (const v of edge) {
    if (!(v in vertices)) {
      vertices[v] = {
        name: v,
        big: v[0].toUpperCase() == v[0],
        start: v == 'start',
        end: v == 'end',
        adjs: []
      }
    }
  }
  const [a, b] = edge
  vertices[a].adjs.push(b)
  vertices[b].adjs.push(a)
}

const paths = findPaths(vertices['start'])

console.log(paths)

function findPaths(start) {
  let paths = 0

  req(start)

  return paths

  function req(current, visited = [], twice = false) {
    if (current.end) {
      paths += 1
      return
    }
    for (const adj of current.adjs) {
      const vert = vertices[adj]
      if (vert.start) continue
      if (vert.big || !visited.includes(adj)) {
        req(vert, visited.concat(adj), twice)
      } else if (!twice && visited.includes(adj)) {
        req(vert, visited.concat(adj), true)
      }
    }
  }
}
