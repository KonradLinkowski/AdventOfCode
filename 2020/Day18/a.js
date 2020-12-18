const expressions = require('../../loader').replace(/ +/g, '').split('\n')
const result = expressions.map(expr => {
  while (expr.includes('(')) {
    expr = expr
    .replace(/\(\d+[*+](?:\d+[+*])*\d+\)/g, match => {
      const exp = match.slice(1, -1)
      return evaluate(exp)
    })
    if (expr.match(/^\d+$/)) break
  }
  expr = evaluate(expr)
  return +expr
})

console.log(result.reduce((s, v) => s + v))

function evaluate(expr) {
  if (expr.match(/^\d+$/)) return expr
  expr = expr.replace(/^\d+[*+]\d+/, eval)
  return evaluate(expr)
}
