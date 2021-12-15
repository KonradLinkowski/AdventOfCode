let cave = require('../../loader').split('\n').map(e => e.split('').map(Number))
const rep = 5
for (let y = 0; y < cave.length; y += 1) {
  let row = cave[y]
  for (let i = 1; i < rep; i += 1) {
    row = row.map(cell => add(cell, 1))
    cave[y] = cave[y].concat(row)
  }
}


let copy = cave.map(row => row.slice())
for (let i = 1; i < rep; i += 1) {
  copy = copy.map(row => row.map(cell => add(cell, 1)))
  cave = cave.concat(copy)
}

const dictionary = {}

const graph = []
for (let y = 0; y < cave.length; y += 1) {
  for (let x = 0; x < cave[y].length; x += 1) {
    const key = `${x}:${y}`
    const item = {
      value: cave[y][x],
      key,
      x,
      y
    }
    graph.push(item)
    dictionary[key] = item
  }
}


for (const vertex of graph) {
  vertex.adjs = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(([aX, aY]) => {
    const nX = aX + vertex.x
    const nY = aY + vertex.y
    const key = `${nX}:${nY}`
    return dictionary[key]
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
    const item = queue.shift()
    if (item == end) {
      break
    }

    for (const adj of item.adjs) {
      if (!queue.includes(adj)) continue
      const alt = distance[item.key] + adj.value
      if (alt < distance[adj.key]) {
        distance[adj.key] = alt
        prev[adj.key] = item
        updateQueue(adj)
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

  function updateQueue(item) {
    const itemDistance = distance[item.key]
    const index = queue.indexOf(item)
    for (let i = 0; i < index; i += 1) {
      const vert = queue[i]
      const dist = distance[vert.key]
      if (itemDistance < dist) {
        queue.splice(index, 1)
        queue.splice(i, 0, item)
        return
      }
    }
  }

}

function add(x, y) {
  const z = x + y
  if (z > 9) return 1
  return z
}
