const generateLabyrinthFile = (height, width, chars) => {
  const { writeFileSync } = require("node:fs")

  let content = ""

  const entry = Math.floor(Math.random() * (width - 4)) + 2
  const exit = Math.floor(Math.random() * (width - 4)) + 2

  content += `${height}x${width}${chars}`
  for (let y = 0; y < height; y++) {
    content += "\n"

    for (let x = 0; x < width; x++) {
      if (y === 0 && x === entry) {
        content += chars[3]
      } else if (y === height - 1 && x === exit) {
        content += chars[4]
      } else if (
        y > 0 &&
        y < height - 1 &&
        x > 1 &&
        x < width - 2 &&
        Math.floor(Math.random() * 100) > 20
      ) {
        content += chars[1]
      } else {
        content += chars[0]
      }
    }
  }

  writeFileSync("labyrinth.map", content)
}

const isValidLength = (validLength) => {
  if (!validLength)
    return console.error("Parameters needed: height, width, characters")
  return true
}

const getArgs = () => {
  const args = process.argv.slice(2)
  return args
}

const getGenerateLabyrinthFile = () => {
  const args = getArgs()

  const validLength = args.length === 3 && args[2].length === 5
  if (!isValidLength(validLength)) return

  const height = Math.trunc(args[0])
  const width = Math.trunc(args[1])
  const chars = args[2]

  return generateLabyrinthFile(height, width, chars)
}

getGenerateLabyrinthFile()
