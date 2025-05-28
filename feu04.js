const displayLargestPossibleSquareOnBoard = (boardMatrix) => {
  const largestPossibleSquare = findLargestPossibleSquareOnBoard(boardMatrix)

  const result = boardMatrix.map((array) => [...array])

  const symbol = `${color.blue}o${color.reset}`

  let columnCount = 0
  let j = largestPossibleSquare.columnStartPosition
  while (columnCount < largestPossibleSquare.sideLength) {
    result[largestPossibleSquare.rowStartPosition][j] = symbol

    let rowCount = 0
    let i = largestPossibleSquare.rowStartPosition
    while (rowCount < largestPossibleSquare.sideLength) {
      result[i][j] = symbol

      i++
      rowCount++
    }

    j++
    columnCount++
  }

  result
    .map((array) => array.join(""))
    .forEach((element) => console.log(element))
}

const findLargestPossibleSquareOnBoard = (boardMatrix) => {
  let maxPossibleLength = findLargestSquareAreaOnBoard(boardMatrix)
  let rowStartPosition = 0
  let columnStartPosition = 0

  let isMaxArea = false
  while (!isMaxArea) {
    for (let i = 0; i < boardMatrix.length; i++) {
      if (isMaxArea) {
        break
      }

      if (maxPossibleLength + i > boardMatrix.length) {
        break
      }

      for (let j = 0; j < boardMatrix[i].length; j++) {
        if (maxPossibleLength + j > boardMatrix[i].length) {
          break
        }

        let isSquarePossible = true

        let columnStart = 0
        let k = j
        while (columnStart < maxPossibleLength) {
          if (boardMatrix[i][k] === "x") {
            isSquarePossible = false
            break
          }

          if (!isSquarePossible) {
            break
          }

          let rowStart = 0
          let l = i
          while (rowStart < maxPossibleLength) {
            if (boardMatrix[l][k] === "x") {
              isSquarePossible = false
              break
            }

            rowStart++
            l++
          }

          columnStart++
          k++
        }

        if (isSquarePossible) {
          isMaxArea = true
          rowStartPosition = i
          columnStartPosition = j
          break
        }
      }
    }
    if (!isMaxArea) {
      maxPossibleLength--
    }
  }

  return {
    sideLength: maxPossibleLength,
    area: maxPossibleLength * maxPossibleLength,
    rowStartPosition: rowStartPosition,
    columnStartPosition: columnStartPosition,
  }
}

const findLargestSquareAreaOnBoard = (boardMatrix) => {
  const horizontalLength = boardMatrix[0].length
  const verticalLength = boardMatrix.length

  let maxLength = horizontalLength

  if (horizontalLength > verticalLength) {
    maxLength = verticalLength
  }

  return maxLength
}

const color = {
  reset: "\x1b[0m",
  blue: "\x1b[34m",
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

const isValidBoard = (boardContent) => {
  if (boardContent === "") {
    return console.error("ERROR: no Line with a Box")
  }

  let firstLineFeedIndex = 0
  let firstBoardIndex = 0
  for (let i = 0; i < boardContent.length; i++) {
    if (boardContent[i].charCodeAt() === 10) {
      firstLineFeedIndex = i
      firstBoardIndex = i + 1
      break
    }
  }

  if (firstLineFeedIndex === boardContent.length - 1) {
    return console.error("ERROR: no Line with a Box")
  }

  if (firstLineFeedIndex === 0) {
    return console.error("ERROR: Lines are not Separated by a Line Break")
  }

  const validSymbol = [".", "x"]

  let wantedLineLength = 0
  for (let j = firstBoardIndex; j < boardContent.length; j++) {
    if (boardContent[j].charCodeAt() === 10) break

    if (!validSymbol.includes(boardContent[j])) {
      return console.error("ERROR: Board contain Unvalid Symbol")
    }

    wantedLineLength++
  }

  if (boardContent[firstBoardIndex + wantedLineLength] === boardContent.length)
    return false

  const secondLineStartIndex = firstBoardIndex + wantedLineLength + 1
  let lineLength = 0
  for (let k = secondLineStartIndex; k < boardContent.length; k++) {
    if (boardContent[k].charCodeAt() === 10) {
      if (lineLength !== wantedLineLength) {
        return console.error("ERROR: Lines do not have the Same length")
      }
      lineLength = 0
      continue
    }

    if (!validSymbol.includes(boardContent[k])) {
      return console.error("ERROR: Board contain Unvalid Symbol")
    }

    lineLength++

    if (k === boardContent.length - 1) {
      if (lineLength !== wantedLineLength) {
        return console.error("ERROR: Lines do not have the Same length")
      }
    }
  }

  return true
}

const getArgs = () => {
  const args = process.argv.slice(2)
  return args
}

const getLargestSquareOnBoard = () => {
  const args = getArgs()

  const validLength = args.length === 1
  if (!isValidLength(validLength)) return

  const boardContent = getFileContent(args[0])
  if (!isValidBoard(boardContent)) return

  const boardMatrix = parseContentToMatrix(boardContent)
  displayLargestPossibleSquareOnBoard(boardMatrix.slice(1))
}

getLargestSquareOnBoard()
