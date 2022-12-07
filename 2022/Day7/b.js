const data = require('../../loader');
const lines = data.split('\n');

const requiredSpace = 40000000;

const tree = {
  root: {
    parent: null,
    children: {},
  },
};

let currentDir = tree.root;

for (const line of lines) {
  if (line.startsWith('$ cd')) {
    const dir = line.match(/(\/|\.\.|[a-z]+)$/)[0];
    if (dir === '/') {
      currentDir = tree.root;
    } else if (dir === '..') {
      currentDir = currentDir.parent;
    } else {
      const subdir = {
        parent: currentDir,
        children: {},
      };
      currentDir.children[dir] = subdir;
      currentDir = subdir;
    }
  } else if (line.match(/^\d+/)) {
    const [, size, name] = line.match(/(\d+) (.*)/);
    currentDir.children[name] = +size;
  }
}

const directories = calculateTree().sort((a, b) => a - b);

const usedSpace = directories[directories.length - 1];

const minToDelete = usedSpace - requiredSpace;

const dirToDelete = directories.find((dir) => dir >= minToDelete);

console.log(dirToDelete);

function calculateTree() {
  const sizes = [];
  countSize('/', tree.root.children);
  return sizes;

  function countSize(name, children) {
    const list = Object.entries(children);
    let sum = 0;
    for (const [sub, item] of list) {
      if (typeof item === 'number') {
        sum += item;
      } else {
        const subsum = countSize(sub, item.children);
        sum += subsum;
      }
    }
    sizes.push(sum);
    return sum;
  }
}

function print() {
  const lines = [];
  prt('/', tree.root, 0);
  console.log(lines.join('\n'));

  function prt(name, dir, intend) {
    const prefix = '  '.repeat(intend);
    if (typeof dir === 'number') {
      lines.push(prefix + name + ' ' + dir);
    } else {
      lines.push(prefix + name);
      for (const [subname, subdir] of Object.entries(dir.children)) {
        prt(subname, subdir, intend + 1);
      }
    }
  }
}
