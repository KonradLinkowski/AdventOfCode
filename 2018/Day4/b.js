const input = require('../loader')
const events = input.split('\n').map(e => parse(e)).sort((a, b) => a.date - b.date)

const guards = {}

let current = null
let lastDate = null
for (const event of events) {
  if (event.id) {
    current = event.id
  }
  if (guards[current] === undefined) {
    guards[current] = []
  }
  if (event.wakes) {
    guards[current].push({
      start: lastDate,
      end: event.date,
    })
  }
  lastDate = event.date
}


let max = 0
let best = {}
for (const g in guards) {
  const minutes = new Array(60).fill(0)
  guards[g].forEach(e => {
    for (let i = e.start.getMinutes(); i < e.end.getMinutes(); i++) {
      minutes[i - 1] += 1
    }
  })

  let maxN = 0
  let bestN = -1
  minutes.forEach((e, i) => {
    if (e > maxN) {
      maxN = e
      bestN = i + 1
    }
  })
  
  if (maxN > max) {
    max = maxN
    best.id = g
    best.max = bestN
  }
}



console.log(best.max * best.id)


function getMinutes(date1, date2) {
  return (date2 - date1) / (1000 * 60)
}

function parse(line) {
  const date = new Date(line.match(/\[(.*)\]/)[1])
  if (line.includes('Guard')) {
    const id = line.match(/#(\d+)/)[1]
    return {
      id,
      date
    }
  } else if (line.includes('wakes')) {
    return {
      wakes: true,
      date
    }
  } else {
    return {
      falls: true,
      date
    }
  }
}