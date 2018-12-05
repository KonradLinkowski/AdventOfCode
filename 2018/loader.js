const fs = require('fs')
const path = require('path')

function load() {
  const dirname = path.dirname(require.main.filename)
  const filename = path.join(dirname, 'input.txt')
  return fs.readFileSync(filename, 'utf8')
}

module.exports = load()