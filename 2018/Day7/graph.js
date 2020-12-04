class Vertex {
  constructor(name) {
    this.name = name
    this.parents = []
    this.children = []
  }

  toString() {
    const parents = this.parents.map(c => c.name).join(', ') || 'null'
    const children = this.children.map(c => c.name).join(', ') || 'null'
    return `Vertex(name: ${this.name}, parents: ${parents}, children: ${children})`
  }
}

class Graph {
  constructor() {
    this.vertices = []
  }

  addEdge(edge) {
    const parent = this.findVertex(edge[0])
    const child = this.findVertex(edge[1])
    if (parent && child) {
      parent.children.push(child)
      child.parents.push(parent)
    } else if (parent) {
      const v = new Vertex(edge[1])
      parent.children.push(v)
      v.parents.push(parent)
      this.vertices.push(v)
    } else if (child) {
      const v = new Vertex(edge[0])
      v.children.push(child)
      child.parents.push(v)
      this.vertices.push(v)
    } else {
      const p = new Vertex(edge[0])
      const c = new Vertex(edge[1])
      p.children.push(c)
      c.parents.push(p)
      this.vertices.push(p, c)
    }
  }

  findVertex(name) {
    return this.vertices.find(v => v.name == name)
  }

  removeVertexByName(name) {
    const vertex = this.findVertex(name)
    this.removeVertex(vertex)
  }

  removeVertex(vertex) {
    const ind = this.vertices.indexOf(vertex)
    this.vertices.splice(ind, 1)
    vertex.children.forEach(c => {
      const i = c.parents.indexOf(vertex)
      c.parents.splice(i, 1)
    })
  }

  size() {
    return this.vertices.length
  }

  findRoots() {
    return this.vertices.filter(v => v.parents.length == 0)
  }

  toString() {
    return this.vertices.join('\n')
  }
}

function buildGraph(edges) {
  const g = new Graph()
  edges.forEach(e => g.addEdge(e))
  return g
}

module.exports = {
  Vertex,
  Graph,
  buildGraph
}
