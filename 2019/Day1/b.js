const input = require('../../loader')
const numbers = input.split('\n').map(Number)
const calcFuel = mass => {
  const fuel = Math.floor(mass / 3) - 2
  if (fuel <= 0) return 0
  return fuel + calcFuel(fuel)
}
const result = numbers.reduce((p, c) => {
  const fuel = calcFuel(c)
  return p + fuel
}, 0)
console.log(result)
