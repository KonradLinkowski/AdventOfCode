const [description, ticket, nearby] = require("../../loader").replace(/.*ticket.*\n/g, '').split('\n\n')

const ranges = description.split('\n').map(line => {
  const [aFrom, aTo, bFrom, bTo] = line.match(/\d+/g).map(Number)
  return [[aFrom, aTo], [bFrom, bTo]]
})

const tests = nearby.split('\n').map(line => line.split(',').map(Number))

let errorRate = 0

for (const values of tests) {
  for (const value of values) {
    const valid = ranges.some(range => range.some(([min, max]) => value >= min && value <= max))
    if (!valid) {
      errorRate += value
    }
  }
}

console.log(errorRate)
