const input = require('../../loader')
const numbers = input.split('\n').map(Number)
let count = 0
const windows = []
for (let i = 0; i < numbers.length - 3; i += 1) {
  let win = 0
  for (let j = 0; j < 3; j += 1) {
    win += numbers[i + j]
  }
  windows.push(win)
}
for (let i = 1; i < windows.length; i += 1) {
  if (windows[i] > windows[i - 1]) {
    count += 1
  }
}
console.log(count)
