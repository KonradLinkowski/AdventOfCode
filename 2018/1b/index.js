const input = require('../loader')
const numbers = input.split('\n').map(n => Number(n))
const arr = []
let now = 0
while (true) {
  for (freq of numbers) {
    if (arr.includes(now)) {
      return console.log(now)
    }
    arr.push(now)
    now += freq
  }
}