const displayRectangle = (length, width) => {
  for (let i = 0; i < width; i++) {
    let line = ""

    if (i === 0 || i === width - 1) line += "o"
    else line += "|"

    for (let j = 1; j < length; j++) {
      if (j === length - 1) {
        if (i === 0 || i === width - 1) line += "o"
        else line += "|"
        continue
      }

      if (i === 0 || i === width - 1) line += "-"
      else line += " "
    }

    console.log(line)
  }
}

const isValidArgsLength = (args, wantedLength) => {
  if (args.length !== wantedLength)
    return console.error(
      `Le programme a besoin de ${wantedLength} arguments pour fonctionner.`
    )
  return args
}

const isValidNumber = (stringNumber) => {
  if (isNaN(stringNumber))
    return console.error("Le programme a besoin d'un nombre pour fonctionner.")
  return +stringNumber
}

const getArgs = () => {
  const args = process.argv.slice(2)
  return args
}

const getRectangle = () => {
  const args = isValidArgsLength(getArgs(), 2)
  if (!args) return

  const numbers = []
  for (const arg of args) {
    if (!isValidNumber(arg)) return
    numbers.push(+arg)
  }

  const [length, width] = numbers

  return displayRectangle(length, width)
}

getRectangle()
