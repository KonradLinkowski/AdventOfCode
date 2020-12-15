const initial = require("../../loader").split(',').map(Number)

for (let i = initial.length - 1; i < 2019; i += 1) {
  const last = initial[i]
  const index = initial.lastIndexOf(last, i - 1)
  if (~index) {
    initial.push(i - index)
  } else {
    initial.push(0)
  }
}

console.log(initial[initial.length - 1])
