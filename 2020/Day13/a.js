const input = require("../../loader").split('\n')
const minimal = +input[0]
const buses = input[1].split(',').filter(b => b != 'x').map(Number)

const best = buses.map(bus => {
  const mod = minimal % bus
  const diff = bus - mod
  return { diff, bus }
}).sort((a, b) => a.diff - b.diff)[0]

console.log(best.diff * best.bus)
