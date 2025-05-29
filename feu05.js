const displayShortestPathInMaze = (mazeMatrix) => {
  const coord = findCoord(mazeMatrix)
  const [startX, startY] = coord[0]
  const [goalX, goalY] = coord[1]

  const start = new Node(startX + 1, startY)
  const goal = new Node(goalX - 1, goalY)

  const path = aStar(mazeMatrix.slice(1), start, goal)
  const result = mazeMatrix.map((array) => [...array])

  for (const node of path) {
    const { x: x, y: y } = node
    result[x][y] = "o"
  }

  result
    .map((array) => array.join(""))
    .forEach((element) => console.log(element))
}

const aStar = (maze, start, goal) => {
  const openList = [start]
  const closedList = []

  while (openList.length > 0) {
    let current = openList[0]
    let index = 0

    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < current.f) {
        current = openList[i]
        index = i
      }
    }

    openList.splice(index, 1)
    closedList.push(current)

    if (current.x === goal.x && current.y === goal.y) {
      const path = []
      let temp = current

      while (temp) {
        path.unshift({ x: temp.x, y: temp.y })
        temp = temp.parent
      }

      return path
    }

    const neighbours = getNeighbours(maze, current, goal)

    for (const neighbour of neighbours) {
      if (
        closedList.find((ele) => ele.x === neighbour.x && ele.y === neighbour.y)
      ) {
        continue
      }

      if (
        openList.find(
          (ele) =>
            ele.x === neighbour.x &&
            ele.y === neighbour.y &&
            ele.g < neighbour.g
        )
      ) {
        continue
      }

      const existing = openList.find(
        (ele) =>
          ele.x === neighbour.x && ele.y === neighbour.y && ele.g > neighbour.g
      )

      if (existing) {
        existing.g = neighbour.g
        existing.f = neighbour.f
        existing.parent = neighbour.parent
        continue
      }

      openList.push(neighbour)
    }
  }
}

const getNeighbours = (maze, node, goal) => {
  const neighbours = []

  const { x: nodeX, y: nodeY } = node

  const addInNeighbours = (x, y) => {
    const neighbour = new Node(x, y)
    neighbour.parent = node
    neighbour.g = node.g + 1
    neighbour.h = heuristic(neighbour, goal)
    neighbour.f = neighbour.g + neighbour.h

    neighbours.push(neighbour)
  }

  if (nodeX - 1 >= 0) {
    if (maze[nodeX - 1][nodeY] !== "*") {
      addInNeighbours(nodeX - 1, nodeY)
    }
  }

  if (nodeX + 1 < maze.length) {
    if (maze[nodeX + 1][nodeY] !== "*") {
      addInNeighbours(nodeX + 1, nodeY)
    }
  }

  if (nodeY - 1 >= 0) {
    if (maze[nodeX][nodeY - 1] !== "*") {
      addInNeighbours(nodeX, nodeY - 1)
    }
  }

  if (nodeY + 1 < maze[nodeX].length) {
    if (maze[nodeX][nodeY + 1] !== "*") {
      addInNeighbours(nodeX, nodeY + 1)
    }
  }

  return neighbours
}

const heuristic = (node, goal) => {
  // Manhattan heuristic
  return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y)
}

const findCoord = (maze) => {
  let startCoord = []
  const goalCoord = []

  const entrySymbol = maze[0][8]
  const exitSymbol = maze[0][9]

  let isStart = false
  let isGoal = false
  for (let i = 1; i < maze.length; i++) {
    if (isStart && isGoal) break
    for (let j = 0; j < maze[i].length; j++) {
      if (isStart && isGoal) break

      if (maze[i][j] === entrySymbol) {
        startCoord.push(i, j)
        isStart = true
      }

      if (maze[i][j] === exitSymbol) {
        goalCoord.push(i, j)
        isGoal = true
      }
    }
  }

  return [startCoord, goalCoord]
}

class Node {
  constructor(x, y) {
    this.parent = null
    this.x = x
    this.y = y
    this.g = Infinity
    this.h = 0
    this.f = Infinity
  }
}

const getFileContent = (fileName) => {
  const { readFileSync } = require("node:fs")

  const content = readFileSync(`./${fileName}`, "utf8")
  return content
}

const parseContentToMatrix = (content) => {
  const matrix = content.split("\n").map((string) => string.split(""))
  return matrix
}

const isValidLength = (validLength) => {
  if (!validLength)
    return console.error("ERROR: Number of Arguments is Invalid.")
  return true
}

const getArgs = () => {
  const args = process.argv.slice(2)
  return args
}

const getShortestPathInLabyrinth = () => {
  const args = getArgs()

  const validLength = args.length === 1
  if (!isValidLength(validLength)) return

  const mazeContent = getFileContent(args[0])

  const mazeMatrix = parseContentToMatrix(mazeContent)
  displayShortestPathInMaze(mazeMatrix)
}

getShortestPathInLabyrinth()
