const input = require('../loader')
const claims = input.split('\n').map(c => parseClaim(c))

const noOverlap = [...claims.map(c => c.id)]
const array = new Array(1001).fill(0).map(e => new Array(1001).fill(0))
for (const claim of claims) {
  for (let i = 0; i < claim.width; i++) {
    for (let j = 0; j < claim.height; j++) {
      if (array[claim.left + i][claim.top + j] !== 0) {
        const newIndex = noOverlap.indexOf(claim.id)
        if (newIndex !== -1) noOverlap.splice(newIndex, 1)
        const oldIndex = noOverlap.indexOf(array[claim.left + i][claim.top + j])
        if (oldIndex !== -1) noOverlap.splice(oldIndex, 1)
      }
      array[claim.left + i][claim.top + j] = claim.id
    }
  }
}

console.log(noOverlap[0])

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