const string = require('../../loader').split('\n')

const valid = string.filter(isNice)

console.log(valid.length)

function isNice(str) {
  const haveDuplicated = /(..).*(?=\1)/.test(str)
  const haveCyclops = /(.).(?=\1)/.test(str)

  return haveDuplicated && haveCyclops
}
