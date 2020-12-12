const instructionss = require("../../loader").split("\n").map((line) => {
  const dir = line[0]
  const len = +line.match(/\d+/)[0]
  return { dir, len }
});

const ship = { x: 0, y: 0 }
const waypoint = { x: 10, y: 1 }

for (const { dir, len } of instructionss) {
  run(waypoint, ship, dir, len)
}

console.log(distance(ship.x, ship.y))

function distance(x, y) {
  return Math.abs(x) + Math.abs(y)
}

function run(waypoint, ship, dir, len) {
  const { x, y, move, rot, go } = dirMap(waypoint, dir, len)
  if (move) {
    waypoint.x += x * len
    waypoint.y += y * len
  }
  if (rot) {
    waypoint.x = x
    waypoint.y = y
  }
  if (go) {
    ship.x += x * len
    ship.y += y * len
  }
}

function dirMap(waypoint, dir, len) {
  const world = {
    N: { x: 0, y: 1 },
    S: { x: 0, y: -1 },
    E: { x: 1, y: 0 },
    W: { x: -1, y: 0 }
  };

  const relative = {
    L: ({ x, y }) => ({ x: -y, y: x }),
    R: ({ x, y }) => ({ x: y, y: -x })
  }

  if (dir in world) {
    const { x, y } = world[dir]
    return { x, y, move: true }
  } else if (dir in relative) {
    let res = { x: waypoint.x, y: waypoint.y }
    for (let i = 0; i < len / 90; i += 1) {
      res = relative[dir](res)
    }
    return { x: res.x, y: res.y, rot: true }
  } else {
    return { x: waypoint.x, y: waypoint.y, go: true }
  }
}
