const input = require('../loader')
const ids = input.split('\n')
for (let i = 0; i < ids.length - 1; i++) {
  for (let j = i + 1; j < ids.length; j++) {
    if (differenceCount(ids[i], ids[j]) === 1) {
      return console.log(common(ids[i], ids[j]))
    }
  }
}

function differenceCount(word1, word2) {
  const w = word1.split('')
  const s = word2.split('')
  return w.reduce((p, c, i) => p + (c !== s[i]), 0)
}

function common(word1, word2) {
  const res = []
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] === word2[i]) {
      res.push(word1[i])
    }
  }
  return res.join('')
}