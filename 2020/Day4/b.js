const data = require('../../loader').split('\n\n')
const passwords = data.map(d => {
  const matches = d.match(/[a-z]+:[a-z0-9#]+/g)
  const fields = matches.map(m => m.split(':'))
  return fields
})

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const valid = passwords
.filter(p => requiredFields.every(f => p.find(([key]) => key == f)))
.filter(p => p.every(e => validate(e)))
console.log(valid.length)

function validate([key, value]) {
  const validators = {
    byr: v => v >= 1920 && v <= 2002,
    iyr: v => v >= 2010 && v <= 2020,
    eyr: v => v >= 2020 && v <= 2030,
    hgt: v => {
      const [_, num, unit] = v.match(/^(\d+)(cm|in)$/) || []
      if (unit == 'cm') {
        return num >= 150 && num <= 193
      } else if (unit == 'in') {
        return num >= 59 && num <= 76
      }
    },
    hcl: v => v.match(/^#[a-z0-9]{6}$/),
    ecl: v => v.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
    pid: v => v.match(/^\d{9}$/)
  }

  const f = () => true
  
  const valid = (validators[key] || f)(value)

  return valid
}
