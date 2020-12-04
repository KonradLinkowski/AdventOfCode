const boxes = require('../../loader').split('\n').map(l => l.split('x').map(Number))
const ribbons = boxes.map(([x, y, z]) => Math.min(2 * (x + y), 2 * (x + z), 2 * (y + z)) + x * y * z)
const sum = ribbons.reduce((s, p) => s + p)
console.log(sum)
