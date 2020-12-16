const [description, myTicket, nearby] = require("../../loader").replace(/.*ticket.*\n/g, '').split('\n\n')

const fields = description.split('\n').map(line => {
  const name = line.match(/^[a-z]+( [a-z]+)?/)[0]
  const [aFrom, aTo, bFrom, bTo] = line.match(/\d+/g).map(Number)
  return {
    name,
    ranges: [[aFrom, aTo], [bFrom, bTo]]
  }
})

const tests = nearby.split('\n').map(line => line.split(',').map(Number))

const valids = tests.filter(
  test => test.every(
    value => fields.some(
      ({ ranges }) => ranges.some(([min, max]) => value >= min && value <= max)
    )
  )
)

const guesses = Array(valids[0].length).fill(0).map(() => [...fields])

for (const ticket of valids) {
  for (const index in ticket) {
    const value = ticket[index]
    const valid = guesses[index].filter(({ ranges }) =>
      ranges.some(([min, max]) => value >= min && value <= max)
    )
    guesses[index] = valid
  }
}

const entries = Object.entries(guesses)


entries.sort((a, b) => a[1].length - b[1].length)

const result = []

entries.forEach(([index, guess]) => {
  const nw = guess.find(({ name }) => !result.includes(name))
  result[index] = nw.name
})

const indexes = result
  .map((name, index) => ({ name, index }))
  .filter(result => result.name.startsWith('departure'))
  .map(({ index }) => index)

const vals = myTicket.split(',').filter((val, i) => indexes.includes(i)).map(Number)

console.log(vals.reduce((m, v) => m * v))
