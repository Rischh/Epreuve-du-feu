const solveSudoku = (grid, row, cell) => {
  if (row === 9) return true

  if (cell === 9) return solveSudoku(grid, ++row, 0)

  if (grid[row][cell] !== ".") return solveSudoku(grid, row, ++cell)

  for (let k = 1; k <= 9; k++) {
    if (isValidCell(grid, row, cell, k)) {
      grid[row][cell] = k

      if (solveSudoku(grid, row, ++cell)) return true
      grid[row][cell] = "."
    }
  }

  return false
}

const isValidCell = (grid, row, cell, k) => {
  const notInRow = !grid[row].includes(k)

  let notInColumn = true
  for (let i = 0; i < 9; i++) {
    if (grid[i][cell] === k) {
      notInColumn = false
      break
    }
  }

  let notInSubgrid = true
  for (let j = Math.floor(row / 3) * 3; j < Math.floor(row / 3) * 3 + 3; j++) {
    for (
      let l = Math.floor(cell / 3) * 3;
      l < Math.floor(cell / 3) * 3 + 3;
      l++
    ) {
      if (grid[j][l] === k) {
        notInSubgrid = false
        break
      }
    }
  }

  return notInRow && notInColumn && notInSubgrid
}

const getContentFile = (fileName) => {
  const { readFileSync } = require("node:fs")

  const content = readFileSync(`./${fileName}`, "utf8")
  return content
}

const parseSudokuContentToMatrix = (sudokuContent) => {
  const matrixSudoku = sudokuContent
    .split("\n")
    .map((string) => string.split(""))

  const stringDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  for (let i = 0; i < matrixSudoku.length; i++) {
    for (let j = 0; j < matrixSudoku[i].length; j++) {
      if (stringDigits.includes(matrixSudoku[i][j])) {
        matrixSudoku[i][j] = +matrixSudoku[i][j]
      }
    }
  }

  return matrixSudoku
}

const isValidLength = (validLength) => {
  if (!validLength)
    return console.error("ERROR: Number of Arguments is Invalid.")
  return true
}

const isValidFileExtension = (fileName, validFileExtension) => {
  const fileExtension = fileName.split(".")[1]

  if (fileExtension !== validFileExtension)
    return console.error("L'extension du fichier n'est pas valide.")
  return true
}

const getArgs = () => {
  const args = process.argv.slice(2)
  return args
}

const displayResolvedSudoku = () => {
  const args = getArgs()

  const validLength = args.length === 1
  if (!isValidLength(validLength)) return

  const fileName = args[0]
  if (!isValidFileExtension(fileName, "txt")) return

  const sudokuContent = getContentFile(fileName)
  const sudokuMatrix = parseSudokuContentToMatrix(sudokuContent)

  const result = sudokuMatrix.map((array) => [...array])

  solveSudoku(result, 0, 0)
  return result
    .map((array) => array.join(""))
    .forEach((element) => console.log(element))
}

displayResolvedSudoku()
