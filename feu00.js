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

const isValidLength = (validLength) => {
  if (!validLength)
    return console.error("ERROR: Number of Arguments is Invalid.")
  return true
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
  const args = getArgs()

  const validLength = args.length === 2
  if (!isValidLength(validLength)) return

  const numbers = []
  for (const arg of args) {
    const number = isValidNumber(arg)
    if (!number) return

    numbers.push(number)
  }

  const [length, width] = numbers

  return displayRectangle(length, width)
}

getRectangle()
