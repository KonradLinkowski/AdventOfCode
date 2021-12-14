const input = require('../../loader').split('\n\n')
const list = createLinkedList(input[0].split(''))

const rules = input[1].split('\n').reduce((rules, line) => {
  rules[line.slice(0, 2)] = line[line.length - 1]
  return rules
}, {})

for (let step = 0; step < 10; step += 1) {
  let current = list
  let len = 0
  while (current.next) {
    len += 1
    const str = current.item + current.next.item
    if (str in rules) {
      const newItem = { item: rules[str], next: current.next }
      current.next = newItem
      current = newItem.next
    }
  }
}

const count = countItems(list)
const values = Object.values(count)
const min = Math.min(...values)
const max = Math.max(...values)
console.log(max - min)

function createLinkedList(array) {
  let prev = null
  for (let i = array.length - 1; i >= 0; i -= 1) {
    const el = {
      item: array[i],
      next: prev || null
    }
    prev = el
  }
  return prev
}

function countItems(list) {
  let current = list
  const count = {}
  while (current) {
    if (current.item in count) {
      count[current.item] += 1
    } else {
      count[current.item] = 1
    }
    current = current.next
  }
  return count
}
