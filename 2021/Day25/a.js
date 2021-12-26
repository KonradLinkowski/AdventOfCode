const floor = require('../../loader').split('\n').map((row, y) => row.split(''))

const cucumbers = {}
const easts = []
const souths = []

const width = floor[0].length
const height = floor.length

const xs = {}
const ys = {}

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    if (floor[y][x] == '.') continue
    const key = getKey(x, y)
    const cucu = {
      x, y, key,
      east: floor[y][x] == '>',
      south: floor[y][x] == 'v'
    }

    xs[x] = cucu
    ys[y] = cucu

    cucumbers[key] = cucu

    if (cucu.east) {
      easts.push(cucu)
    }
    if (cucu.south) {
      souths.push(cucu)
    }
  }
}

const all = [easts, souths]

const toMove = []

for (let i = 0; i < 1000; i += 1) {
  let moveCount = 0
  for (const cucus of all) {
    for (const cucu of cucus) {
      const { x, y } = getNextCoords(cucu)
      const nextPlace = getPlace(x, y)
      if (!nextPlace) {
        toMove.push({ x, y, cucumber: cucu })
        moveCount += 1
      }
    }

    while (toMove.length) {
      const { x, y, cucumber } = toMove.pop()
      move(cucumber, x, y)
    }
  }
  if (moveCount == 0) {
    console.log(i + 1)
    break
  }
}

function move(cucumber, x, y) {
  cucumber.x = x
  cucumber.y = y
  delete cucumbers[cucumber.key]
  const newKey = getKey(x, y)
  cucumber.key = newKey
  cucumbers[newKey] = cucumber
}

function getNextCoords(cucumber) {
  return {
    x: cucumber.east ? (cucumber.x + 1) % width : cucumber.x,
    y: cucumber.south ? (cucumber.y + 1) % height : cucumber.y
  }
}

function getPlace(x, y) {
  const key = getKey(x, y)
  return cucumbers[key] || null
}

function getKey(x, y) {
  return `${x}:${y}`
}
