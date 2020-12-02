const input = require('../../loader')
const validPasswords = input.split('\n').map(pol => {
  const [min, max, char, password] = pol.replace(/:/g, '').split(/-| /g)
  const c = count(password, char)
  return c >= min && c <= max
}).filter(Boolean)
console.log(validPasswords.length)

function count(string, char) {
  let c = 0
  for (const s of string) {
    if (s == char) {
      c += 1
    }
  }
  return c
}
