const input = require('../../loader')
let [numbers, ...boards] = input.split('\n\n')
numbers = numbers.split(',').map(Number)
boards = boards.map(board => board.split('\n').map(line => line.trim().split(/ +/g).map(e => ({ num: +e, marked: false }))))

main:
for (const num of numbers) {
  for (const board of boards) {
    markBoard(board, num)
    const won = hasWon(board)
    if (won) {
      const sum = sumUnmarked(board)
      console.log(sum * num)
      break main
    }
  }
}

function sumUnmarked(board) {
  let sum = 0
  for (const row of board) {
    for (const cell of row) {
      if (!cell.marked) {
        sum += cell.num
      }
    }
  }
  return sum
}

function markBoard(board, num) {
  for (const row of board) {
    for (const cell of row) {
      if (cell.num == num) {
        cell.marked = true
      }
    }
  }
}

function hasWon(board) {
  const len = board.length
  for (let i = 0; i < len; i += 1) {
    let countV = 0
    let countH = 0
    for (let j = 0; j < len; j += 1) {
      if (board[i][j].marked) {
        countV += 1
      }
      if (board[j][i].marked) {
        countH += 1
      }
    }
    if (countH == len || countV == 5) {
      return true
    }
  }
  return false
}
