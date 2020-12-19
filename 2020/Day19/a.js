const [rulesLines, messages] = require('../../loader').split('\n\n').map(t => t.split('\n'))

const rules = parseRules(rulesLines)

const matching = messages.filter(mess => testMessage(mess, rules))

console.log(matching.length)

function testMessage(message, rules) {
  const result = req(rules[0], 0)
  return result == message.length
  
  function req(rule, index) {
    if (typeof rule == 'string'){
      return message[index] == rule
    }

    let best = 0

    main:
    for (const subrules of rule) {
      let ind = 0
      for (const r of subrules) {
        const newIndex = req(rules[r], index + ind)
        if (newIndex) {
          ind += newIndex
        } else {
          continue main
        }
      }
      if (ind > best) {
        best = ind
      }
    }

    return best
  }
}

function parseRules(lines) {
  const rules = lines.map(line => {
    const [name, condition] = line.split(': ')
    if (condition.match(/[a-z]/)) {
      return { name, subrules: condition.match(/[a-z]/)[0] }
    }
    const subrules = condition.split('|').map(cond => cond.match(/\d+/g))
    return { name, subrules }
  })

  return rules.reduce((obj, { name, subrules }) => (obj[name] = subrules, obj), {})
}
