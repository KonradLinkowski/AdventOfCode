const { buildGraph } = require('./graph')

const edges = require('../loader').split('\n').map(d => d.match(/\b\w\b/g))

const graph = buildGraph(edges)

const elves = Array(5).fill(0).map(() => ({ timeLeft: 0, timeWorked: 0, currentTask: null }))
let time = 0

while (graph.size()) {
  const tasks = graph.findRoots().filter(r => !r.inprogress).sort((a, b) => a.name.localeCompare(b.name))
  for (const task of tasks) {
    const i = elves.findIndex(e => e.currentTask == null)
    if (~i) {
      task.inprogress = true
      elves[i].currentTask = task
      const time = 60 + task.name.charCodeAt(0) - 64
      elves[i].timeLeft = time
      elves[i].timeWorked = time
    }
  }

  elves.forEach(e => {
    if (e.currentTask != null) {
      e.timeLeft -= 1
      if (e.timeLeft == 0) {
        graph.removeVertex(e.currentTask)
        e.currentTask = null
      }
    }
  })
  time += 1
}

console.log(time)
