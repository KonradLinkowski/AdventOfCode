const input = require('../../loader')
const commands = input.split('\n').map(line => {
  const [command, num] = line.split(' ')
  return { command, num: +num }
})

let pos = {
  x: 0,
  y: 0,
  aim: 0,
}
const map = {
  forward: num => {
    pos.x += num
    pos.y += num * pos.aim
  },
  up: num => pos.aim -= num,
  down: num => pos.aim += num,
}

for (const { command, num } of commands) {
  map[command](num)
}

console.log(pos)
console.log(pos.x * pos.y)
