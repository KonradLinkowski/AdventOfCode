const input = require('../../loader').split('\n').map(x => x.split(' | ').map(e => e.split(' ')))

const one = {
  digit: 1,
  segments: ['c', 'f']
}

const three = {
  digit: 3,
  segments: ['a', 'c', 'd', 'f', 'g']
}

const five = {
  digit: 5,
  segments: ['a', 'b', 'd', 'f', 'g']
}

const uniqueDigits = [{
  digit: 1,
  segments: ['c', 'f']
}, {
  digit: 4,
  segments: ['b', 'c', 'd', 'f']
}, {
  digit: 7,
  segments: ['a', 'c', 'f']
}, {
  digit: 8,
  segments: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
}]

const allDigits = [{
  digit: 0,
  segments: ['a', 'b', 'c', 'e', 'f', 'g']
}, {
  digit: 1,
  segments: ['c', 'f']
}, {
  digit: 2,
  segments: ['a', 'c', 'd', 'e', 'g']
}, {
  digit: 3,
  segments: ['a', 'c', 'd', 'f', 'g']
}, {
  digit: 4,
  segments: ['b', 'c', 'd', 'f']
}, {
  digit: 5,
  segments: ['a', 'b', 'd', 'f', 'g']
}, {
  digit: 6,
  segments: ['a', 'b', 'd', 'e', 'f', 'g']
}, {
  digit: 7,
  segments: ['a', 'c', 'f']
}, {
  digit: 8,
  segments: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
}, {
  digit: 9,
  segments: ['a', 'b', 'c', 'd', 'f', 'g']
}]

let sum = 0

for (const [signals, code] of input) {
  const possibilities = genPossibilities()
  for (const unique of uniqueDigits) {
    const sig = signals.find(s => s.length == unique.segments.length)
    for (const segment of unique.segments) {
      possibilities[segment] = possibilities[segment].filter(pos => sig.includes(pos))
    }
    for (const segment of genInverse(unique.segments)) {
      possibilities[segment] = possibilities[segment].filter(pos => !sig.includes(pos))
    }
  }

  const threeSignal = signals.find(sig => sig.length == 5 && one.segments.every(seg => possibilities[seg].every(e => sig.includes(e))))

  for (const segment of three.segments) {
    possibilities[segment] = possibilities[segment].filter(pos => threeSignal.includes(pos))
  }

  for (const segment of genInverse(three.segments)) {
    possibilities[segment] = possibilities[segment].filter(pos => !threeSignal.includes(pos))
  }

  const fiveSignal = signals.find(sig => sig.length == 5 && possibilities['b'].every(pos => sig.includes(pos)))

  for (const segment of five.segments) {
    possibilities[segment] = possibilities[segment].filter(pos => fiveSignal.includes(pos))
  }

  for (const segment of genInverse(five.segments)) {
    possibilities[segment] = possibilities[segment].filter(pos => !fiveSignal.includes(pos))
  }


  const entires = Object.entries(possibilities)

  const result = []
  for (const digit of code) {
    const trueSignal = []
    for (const sig of digit) {
      const tr = entires.find(([, value]) => value.includes(sig))[0]
      trueSignal.push(tr)
    }
    const trueDigit = allDigits.find(dig =>
      dig.segments.every(seg => trueSignal.includes(seg)
      && genInverse(dig.segments).every(seg => !trueSignal.includes(seg))
    ))
    result.push(trueDigit)
  }

  const final = +result.map(t => t.digit).join('')
  sum += final
}

console.log(sum)

function genPossibilities() {
  const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  const obj = {}
  for (const a of alpha) {
    obj[a] = [...alpha]
  }
  return obj
}

function genInverse(segments) {
  const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  return alpha.filter(a => !segments.includes(a))
}
