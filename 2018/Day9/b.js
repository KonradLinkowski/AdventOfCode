const [players, lastMarbleScore] = require('../loader').match(/\d+/g).map(Number)
// const [players, lastMarbleScore] = [13, 7999]

const scores = Array(players).fill(0)
let currentPlayer = 0
let nextMarble = 1
let currentMarble = {
  value: 0
}
currentMarble.next = currentMarble
currentMarble.prev = currentMarble

const max = lastMarbleScore * 100

for (let i = 0; i < max; i += 1) {
  const score = makeMove()
  if (score == lastMarbleScore) {
    break
  }
  nextPlayer()
  incrementMarble()
}

console.log(Math.max(...scores))

function makeMove() {
  if (nextMarble % 23 != 0) {
    const cp1 = currentMarble.next
    const cp2 = cp1.next
    currentMarble = {
      value: nextMarble,
      prev: cp1,
      next: cp2
    }
    cp1.next = currentMarble
    cp2.prev = currentMarble
    return 0
  }
  const cm7 = currentMarble.prev.prev.prev.prev.prev.prev.prev
  const score = nextMarble + cm7.value
  currentMarble = cm7.next
  removeMarble(cm7)
  scores[currentPlayer] += score
  return score
}

function removeMarble(marble) {
  marble.prev.next = marble.next
  marble.next.prev = marble.prev
}

function nextPlayer() {
  currentPlayer = (currentPlayer + 1) % players
}

function incrementMarble() {
  nextMarble += 1
}
