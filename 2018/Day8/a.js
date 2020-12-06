const data = require('../loader').split(' ').map(Number)

const result = scan()
console.log(result)

function scan() {
  const childLength = data.shift()
  const metaLength = data.shift()
  let metaSum = 0
  for (let c = 0; c < childLength; c += 1) {
    metaSum += scan()
  }
  for (let m = 0; m < metaLength; m += 1) {
    metaSum += data.shift()
  }
  return metaSum
}
