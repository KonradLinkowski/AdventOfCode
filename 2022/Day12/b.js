const grid = require('../../loader')
  .split('\n')
  .map((row, y) => [...row].map((char, x) => ({ c: char, x, y })));

const list = grid.flat();

list.forEach((item) => (item.neighbours = getNeighbours(list, item)));

const end = list.find((e) => e.c === 'E');

findPath(list, end);

const as = list.filter((e) => e.c === 'a' || e.c === 'S').filter((e) => e.prev);

let best = Infinity;
for (const a of as) {
  const path = [];
  let temp = a;
  while (temp) {
    path.unshift(temp);
    temp = temp.prev;
  }

  const steps = path.length - 1;

  if (steps === 0) {
    console.log(path);
  }

  if (steps < best) {
    best = steps;
  }
}

console.log(best);

function findPath(nodes, start) {
  start.dist = 0;

  const queue = createQueue();

  for (const node of nodes) {
    if (node !== start) {
      node.dist = Infinity;
      node.prev = null;
    }
    queue.push(node, node.dist);
  }

  while (queue.size()) {
    const u = queue.pop();

    for (const v of u.neighbours) {
      const alt = u.dist + 1;
      if (v.x === 5 && v.y === 1) {
      }
      if (alt < v.dist) {
        v.dist = alt;
        v.prev = u;
        queue.remove(v);
        queue.push(v, alt);
      }
    }
  }
}

function getNeighbours(items, item) {
  const neighs = [
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];

  const neighbours = [];

  for (const { x, y } of neighs) {
    const other = items.find((e) => e.x === item.x + x && e.y === item.y + y);
    if (other && getHeight(item) <= getHeight(other) + 1) {
      neighbours.push(other);
    }
  }

  return neighbours;
}

function getHeight(item) {
  if (item.c === 'S') return 0;
  if (item.c === 'E') return 25;
  return item.c.charCodeAt(0) - 'a'.charCodeAt(0);
}

function createQueue() {
  let head = null;
  let count = 0;

  const push = (value, priority) => {
    const node = { value, priority, next: null };
    count += 1;
    if (!head) {
      head = node;
      return;
    }
    if (head.priority > priority) {
      const temp = head;
      head = node;
      node.next = temp;
      return;
    }
    let temp = head;
    while (temp.next && temp.next.priority < priority) {
      temp = temp.next;
    }
    node.next = temp.next;
    temp.next = node;
  };

  const pop = () => {
    count -= 1;
    const temp = head;
    head = head.next;
    return temp.value;
  };

  const peek = () => {
    return head.value;
  };

  const size = () => {
    return count;
  };

  const print = () => {
    let temp = head;
    while (temp) {
      console.log(temp);
      temp = temp.next;
    }
  };

  const remove = (value) => {
    if (head.value === value) {
      return pop();
    }
    count -= 1;
    let temp = head;
    while (temp.next.value !== value) {
      temp = temp.next;
    }
    const val = temp.next;
    temp.next = temp.next.next;
    return val.value;
  };

  return {
    push,
    pop,
    peek,
    size,
    print,
    remove,
  };
}
