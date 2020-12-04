const data = require('../../loader').split('\n\n')
const passwords = data.map(d => {
  const matches = d.match(/[a-z]+:[a-z0-9#]+/g)
  const fields = matches.map(m => m.split(':')[0])
  return fields
})
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const valid = passwords.filter(p => requiredFields.every(f => p.includes(f)))
console.log(valid.length)
