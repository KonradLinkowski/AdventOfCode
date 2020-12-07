"use strict"
const fs = require('fs')

let lines = fs.readFileSync('25a.txt', 'utf8').replace(/\.|\r|:/g,'').split('\n')
for (let i = 0; i < lines.length; i++) {
  lines[i] = lines[i].split(' ')
}
class State {
  constructor(name, value0, direction0, next0, value1, direction1, next1) {
    this.name = name
    this.current = {
      '1': {
        value: parseInt(value1),
        direction: direction1,
        next: next1
      },
      '0': {
        value: parseInt(value0),
        direction: direction0,
        next: next0
      }
    }
  }
  log() {
    console.log ('name', this.name, 'current', this.current)
  }
}
let currentState = lines[0][lines[0].length - 1]
let numberOfSteps = parseInt(lines[1][lines[1].length - 2])
let states = [];
for (let i = 2; i < lines.length; i += 10) {
  states.push(new State(
    lines[i + 1][lines[i + 1].length - 1],
    lines[i + 3][lines[i + 3].length - 1],
    lines[i + 4][lines[i + 4].length - 1],
    lines[i + 5][lines[i + 5].length - 1],
    lines[i + 7][lines[i + 7].length - 1],
    lines[i + 8][lines[i + 8].length - 1],
    lines[i + 9][lines[i + 9].length - 1],
  ))
}
currentState = getItem(states, currentState, 'name')
class Chain {
  constructor(options) {
    if (!options) {
      this.value = 0;
      this.left = null;
      this.right = null;
    } else {
      this.value = options.value === undefined ? 0 : options.value;
      this.left = options.left === undefined ? null : options.left;
      this.right = options.right === undefined ? null: options.right;
    }
  }
  next(name) {
    if (name == 'right') {
      return this.getRigth();
    }
    return this.getLeft();
  }
  getRigth() {
    if (!this.right) {
      this.right = new Chain({left: this});
    }
    return this.right;
  }
  getLeft() {
    if (!this.left) {
      this.left = new Chain({right: this});
    }
    return this.left;
  }
  getSum() {
    let current = this;
    while (current.left != null) {
      current = current.left;
    }
    let sum = 0;
    let string = []
    while (current != null) {
      //console.log(current)
      string.push(current.value)
      sum += parseInt(current.value)
      current = current.right
    }
    return sum;
  }
}
states.forEach(el => el.log())
let cursor = new Chain();
for (let i = 0; i < numberOfSteps; i++) {
  let temp = cursor.value
  cursor.value = currentState.current[temp].value;
  cursor = cursor.next(currentState.current[temp].direction);
  currentState = getItem(states, currentState.current[temp].next, 'name');
}

console.log(cursor.getSum())

function getItem(array, value, propName) {
  for (let el of array) {
    if (el[propName] === value) {
      return el;
    }
  }
  return null;
}