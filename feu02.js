const displayShapePositionWithinBoard = (boardMatrix, shapeMatrix) => {
  let isFound = false
  let firstColumnShapeIndexInBoard = null
  let firstRowShapeIndexInBoard = null
  let shapeVisualization = null

  for (let i = 0; i < boardMatrix.length; i++) {
    let indexEnd = shapeMatrix[0].length
    for (let j = 0; j < boardMatrix[i].length; j++) {
      const slicedBoardIntoShape = []

      for (let k = 0; k < shapeMatrix.length; k++) {
        if (boardMatrix[i + k] === undefined) break
        slicedBoardIntoShape.push(boardMatrix[i + k].slice(j, indexEnd))
      }
      indexEnd++

      isFound = isShape(slicedBoardIntoShape, shapeMatrix)
      
      if (isFound) {
        firstColumnShapeIndexInBoard = j
        firstRowShapeIndexInBoard = i

        shapeVisualization = getShapeVisualization(
          boardMatrix,
          shapeMatrix,
          firstRowShapeIndexInBoard,
          firstColumnShapeIndexInBoard
        )
        break
      }
    }
    if (isFound) break
  }

  if (isFound) {
    console.log("Trouvée !")
    console.log(
      `Coordonnées : ${firstColumnShapeIndexInBoard},${firstRowShapeIndexInBoard}`
    )
    shapeVisualization
      .map((array) => array.join(""))
      .forEach((ele) => console.log(ele))
  } else {
    console.log("Introuvable")
  }
}

const isShape = (slicedBoardMatrix, shapeMatrix) => {
  let isEqual = true

  for (let i = 0; i < slicedBoardMatrix.length; i++) {
    for (let j = 0; j < slicedBoardMatrix[i].length; j++) {
      const slicedMatrixValue = slicedBoardMatrix[i][j]
      const shapeMatrixValue = shapeMatrix[i][j]

      if (shapeMatrixValue === " ") continue

      if (slicedMatrixValue !== shapeMatrixValue) {
        isEqual = false
        break
      }
    }
  }

  return isEqual
}

const getShapeVisualization = (
  boardMatrix,
  shapeMatrix,
  firstRowShapeIndexInBoard,
  firstColumnShapeIndexInBoard
) => {
  const result = boardMatrix.map((array) => [...array])

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = "-"
    }
  }

  let shapeRowIndexInBoard = firstRowShapeIndexInBoard
  const lastShapeRowIndex = firstRowShapeIndexInBoard + shapeMatrix.length - 1
  let shapeRow = 0

  while (shapeRowIndexInBoard <= lastShapeRowIndex) {
    let shapeColumnIndexInBoard = firstColumnShapeIndexInBoard
    const lastShapeColumnIndex =
      firstColumnShapeIndexInBoard + shapeMatrix[0].length - 1
    let shapeColumn = 0

    while (shapeColumnIndexInBoard <= lastShapeColumnIndex) {
      if (shapeMatrix[shapeRow][shapeColumn] === " ") {
        result[shapeRowIndexInBoard][shapeColumnIndexInBoard] = "-"
      } else {
        result[shapeRowIndexInBoard][shapeColumnIndexInBoard] =
          shapeMatrix[shapeRow][shapeColumn]
      }

      shapeColumn++
      shapeColumnIndexInBoard++
    }

    shapeRow++
    shapeRowIndexInBoard++
  }

  return result
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

const isValidFileExtension = (fileName, expectedFileExtension) => {
  const fileExtension = fileName.split(".").pop()

  if (fileExtension !== expectedFileExtension)
    return console.error("ERROR: File Extension is Invalid")
  return true
}

const getArgs = () => {
  const args = process.argv.slice(2)
  return args
}

const getShapePositionWithinBoard = () => {
  const args = getArgs()

  const validLength = args.length === 2
  if (!isValidLength(validLength)) return

  for (const file of args) {
    if (!isValidFileExtension(file, "txt")) return
  }

  const boardContent = getFileContent(args[0])
  const shapeContent = getFileContent(args[1])
  const boardMatrix = parseContentToMatrix(boardContent)
  const shapeMatrix = parseContentToMatrix(shapeContent)

  return displayShapePositionWithinBoard(boardMatrix, shapeMatrix)
}

getShapePositionWithinBoard()
