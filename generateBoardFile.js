const generateBoardFile = (x, y, density) => {
  const { writeFileSync } = require("node:fs")

  let content = ""

  content += `${y}.xo`
  for (let i = 0; i < y; i++) {
    content += "\n"
    for (let j = 0; j < x; j++) {
      content += `${Math.floor(Math.random() * y) * 2 < density ? "x" : "."}`
    }
  }

  writeFileSync("plateau", content)
}

const isValidLength = (validLength) => {
  if (!validLength) return console.error("Parameters needed: x, y, density")
  return true
}

const getArgs = () => {
  const args = process.argv.slice(2)
  return args
}

const getGenerateBoardFile = () => {
  const args = getArgs()

  const validLength = args.length === 3
  if (!isValidLength(validLength)) return

  const x = Math.trunc(args[0])
  const y = Math.trunc(args[1])
  const density = Math.trunc(args[2])

  return generateBoardFile(x, y, density)
}

getGenerateBoardFile()
