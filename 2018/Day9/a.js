const [players, lastMarbleScore] = require('../loader').match(/\d+/g).map(Number)


const scores = Array(players).fill(0)
const game = [0]
let currentPlayer = 0
let currentMarbleIndex = 0
let nextMarble = 1

for (let i = 0; i < lastMarbleScore; i += 1) {
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
    const cp2 = getPosition(2)
    placeMarble(cp2)
    setCurrentMarble(cp2)
    return 0
  }
  const cm7 = getPosition(-7)
  const score = nextMarble + game[cm7]
  removeMarble(cm7)
  setCurrentMarble(cm7)
  scores[currentPlayer] += score
  return score
}

function setCurrentMarble(pos) {
  currentMarbleIndex = pos
}

function placeMarble(pos) {
  game.splice(pos, 0, nextMarble)
}

function removeMarble(pos) {
  game.splice(pos, 1)
}

function nextPlayer() {
  currentPlayer = (currentPlayer + 1) % players
}

function incrementMarble() {
  nextMarble += 1
}

function getPosition(offset) {
  return (currentMarbleIndex + game.length + offset) % game.length || game.length
}

function print(red) {
  const g = game.map((m, i) => i == currentMarbleIndex ? `(${m})` : m).join(' ')
  console.log(red ? '\x1b[31m' : '\x1b[0m', g)
}
