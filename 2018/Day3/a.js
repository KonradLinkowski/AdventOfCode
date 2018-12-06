const input = require('../loader')
const claims = input.split('\n').map(c => parseClaim(c))

const array = new Array(1001).fill(0).map(e => new Array(1001).fill(0))
for (const claim of claims) {
  for (let i = 0; i < claim.width; i++) {
    for (let j = 0; j < claim.height; j++) {
      array[claim.left + i][claim.top + j] += 1
    }
  }
}

const result = array.reduce((p, c) => p + c.reduce((p, c) => p + (c > 1), 0), 0)
console.log(result)

function parseClaim(claim) {
  const parts = claim
  .replace(/#| @|:|\r/g, '')
  .split(/[x, ]/g)
  .map(e => Number(e)) 
  return {
    id: parts[0],
    left: parts[1],
    top: parts[2],
    width: parts[3],
    height: parts[4]
  }
}