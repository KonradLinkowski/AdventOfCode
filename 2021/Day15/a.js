const cave = require('../../loader').split('\n').map(e => e.split('').map(Number))
const graph = []
const width = cave[0].length
const height = cave.length
for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    graph.push({
      value: cave[y][x],
      key: `${x}:${y}`,
      x,
      y
    })
  }
}

for (const vertex of graph) {
  vertex.adjs = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(([aX, aY]) => {
    const nX = aX + vertex.x
    const nY = aY + vertex.y
    return graph.find(item => item.x == nX && item.y == nY)
  }).filter(e => e)
}

const start = graph.find(item => item.x == 0 && item.y == 0)
const end = graph.find(item => item.x == cave[0].length - 1 && item.y == cave.length - 1)


const path = findPath(graph, start, end)

let risk = 0
for (const item of path.slice(1)) {
  risk += item.value
}

console.log(risk)

function findPath(graph, start, end) {
  const distance = {}
  const prev = {}
  const queue = []

  for (const vertex of graph) {
    distance[vertex.key] = Infinity
    queue.push(vertex)
  }
  distance[start.key] = 0

  while (queue.length) {
    const { item, index } = findLowestDistance()
    queue.splice(index, 1)
    if (item == end) {
      break
    }

    for (const adj of item.adjs) {
      if (!queue.includes(adj)) continue
      const alt = distance[item.key] + adj.value
      if (alt < distance[adj.key]) {
        distance[adj.key] = alt
        prev[adj.key] = item
      }
    }
  }

  const path = [end]
  let current = end.key
  while (current != start.key) {
    const p = prev[current]
    path.unshift(p)
    current = p.key
  }
  
  return path

  function findLowestDistance() {
    let lowest = Infinity
    let lowestItem = null
    let index = -1
    for (let i = 0; i < queue.length; i += 1) {
      const item = queue[i]
      if (lowest > distance[item.key]) {
        lowestItem = item
        lowest = distance[item.key]
        index = i
      }
    }
    return { item: lowestItem, index }
  }
}
