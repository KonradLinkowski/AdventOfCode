const boxes = require('../../loader').split('\n').map(l => l.split('x').map(Number))
const papers = boxes.map(([x, y, z]) => 2 * (x * y + x * z + y * z) + Math.min(x * y, y * z, x * z))
const sum = papers.reduce((s, p) => s + p)
console.log(sum)
