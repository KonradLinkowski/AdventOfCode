const string = require('../../loader').split('\n')

const valid = string.filter(isNice)

console.log(valid.length)

function isNice(str) {
  const haveVowels = /([aeiou].*){3,}/.test(str)
  const haveDuos = /(.)(?=\1)/.test(str)
  const dontHaveForbidden = !/ab|cd|pq|xy/.test(str)

  return haveVowels && haveDuos && dontHaveForbidden
}
