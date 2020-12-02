const input = require('../../loader')
const validPasswords = input.split('\n').map(pol => {
  const [first, second, char, password] = pol.replace(/:/g, '').split(/-| /g)
  return password[first - 1] == char ^ password[second - 1] == char
}).filter(Boolean)
console.log(validPasswords.length)
