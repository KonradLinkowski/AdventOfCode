const monkeys = require('../../loader').split('\n\n').map(data => {
  const [, itemsLine, operationLine, testLine, trueLine, falseLine] = data.split('\n')

  const operator = operationLine.match(/[+*]/)[0]
  const operand = operationLine.match(/\d+|old$/)[0]

  const operations = {
    '+': operand => operand === 'old' ? old => old + old : old => old + +operand,
    '*': operand => operand === 'old' ? old => old * old : old => old * +operand,
  }

  return {
    items: itemsLine.match(/\d+/g).map(Number),
    test: +testLine.match(/\d+/)[0],
    yes: +trueLine.match(/\d+/)[0],
    no: +falseLine.match(/\d+/)[0],
    operation: operations[operator](operand),
    inspected: 0
  }
});

const divider = monkeys.reduce((div, monkey) => div * monkey.test, 1)

for (let round = 0; round < 10000; round += 1) {
  for (const monkey of monkeys) {
    while (monkey.items.length) {
      const item = monkey.items.shift()
      const worry = monkey.operation(item) % divider
      if (worry % monkey.test === 0) {
        monkeys[monkey.yes].items.push(worry)
      } else {
        monkeys[monkey.no].items.push(worry)
      }
      monkey.inspected += 1
    }
  }
}

const best = monkeys.map(i => i.inspected).sort((a, b) => b - a)

const result = best[0] * best[1]

console.log(result)
