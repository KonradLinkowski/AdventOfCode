const data = require('../loader').split(' ').map(Number)

const result = scan()
console.log(result)

function scan() {
  const childLength = data.shift()
  const metaLength = data.shift()
  let metaSum = 0
  if (childLength) {
    const children = {}
    for (let c = 0; c < childLength; c += 1) {
      children[c + 1] = scan()
    }
    for (let m = 0; m < metaLength; m += 1) {
      const index = data.shift()
      metaSum += children[index] || 0
    }
  } else {
    for (let m = 0; m < metaLength; m += 1) {
      metaSum += data.shift()
    }
  }
  return metaSum
}
