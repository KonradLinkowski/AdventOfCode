const string = require('../../loader')
const crypto = require('crypto')

const max = 10489700

for (let i = 0; i < max; i += 1) {
  if (i % 10000 == 0) console.log(i / max * 100, '%')
  const key = string + i
  const hash = crypto.createHash('md5').update(key).digest("hex")
  if (hash.startsWith('000000')) {
    console.log(key, hash)
    break
  }
}

