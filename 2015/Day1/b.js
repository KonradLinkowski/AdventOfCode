const input = require('../../loader').split('')

for (let i = 0, f = 0; i < input.length; i += 1) {
  if (input[i] == '(') {
    f += 1
  } else {
    f -= 1
  }
  if (f == -1) {
    console.log(i + 1)
    break
  }
}
