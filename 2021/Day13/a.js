let [dots, folds] = require('../../loader').split('\n\n')

dots = dots.split('\n').map(d => {
  const [x, y] = d.match(/\d+/g)
  return { x: +x, y: +y }
})
folds = folds.split('\n').map(fold => {
  const axis = fold.match(/x|y/)[0]
  const number = +fold.match(/\d+/)[0]
  return { axis, number }
}).slice(0, 1)

const width = Math.max(...dots.map(e => e.x)) + 1
const height = Math.max(...dots.map(e => e.y)) + 1

let board = Array(height).fill().map(() => Array(width).fill(0))

for (const { x, y } of dots) {
  board[y][x] = 1
}

for (const { axis, number } of folds) {
  if (axis == 'y') {
    const topHalf = board.slice(0, number)
    const bottomHalf = board.slice(number + 1).reverse()
    for (let y = 0; y < topHalf.length; y += 1) {
      for (let x = 0; x < topHalf[y].length; x += 1) {
        topHalf[y][x] = topHalf[y][x] || bottomHalf[y][x]
      }
    }
    board = topHalf
  } else {
    const leftHalf = board.map(row => row.slice(0, number))
    const rightHalf = board.map(row => row.slice(number + 1).reverse())
    for (let y = 0; y < leftHalf.length; y += 1) {
      for (let x = 0; x < leftHalf[y].length; x += 1) {
        leftHalf[y][x] = leftHalf[y][x] || rightHalf[y][x]
      }
    }
    board = leftHalf
  }
}

let count = 0
for (const row of board) {
  for (const cell of row) {
    count += cell
  }
}

console.log(count)
