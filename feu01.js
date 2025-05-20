const myShuntingYard = (expressions) => {
  let postfix = []

  const operatorsStack = []

  const operators = ["*", "/", "%", "+", "-"]

  for (let i = 0; i < expressions.length; i++) {
    if (expressions[i] === "(") {
      operatorsStack.push(expressions[i])
    }

    if (expressions[i] === ")") {
      let j = operatorsStack.length - 1

      while (operatorsStack[j] !== "(") {
        postfix.push(operatorsStack[j])
        operatorsStack.pop()
        j--
      }
      operatorsStack.pop()
    }

    if (operators.includes(expressions[i])) {
      const lastOperator = operatorsStack[operatorsStack.length - 1]
      const hasOperator = operators.includes(lastOperator)

      if (hasOperator) {
        for (let j = operatorsStack.length - 1; j >= 0; j--) {
          const lastIn = operatorsStack[j]

          if (lastIn === "(") break

          if (lastIn === "+" || lastIn === "-") {
            if (
              expressions[i] === "*" ||
              expressions[i] === "/" ||
              expressions[i] === "%"
            ) {
              break
            }

            if (expressions[i] === "+" || expressions[i] === "-") {
              postfix.push(lastIn)
              operatorsStack.pop()
            }
          }

          if (lastIn === "*" || lastIn === "/" || lastIn === "%") {
            postfix.push(lastIn)
            operatorsStack.pop()
          }
        }
      }
      operatorsStack.push(expressions[i])
    }

    if (!isNaN(expressions[i])) postfix.push(+expressions[i])
  }

  while (operatorsStack.length) {
    for (let j = operatorsStack.length - 1; j >= 0; j--) {
      postfix.push(operatorsStack[j])
      operatorsStack.pop()
    }
  }

  return postfix
}

const evalPostfix = (postfix) => {
  const result = [...postfix]

  const operators = ["*", "/", "%", "+", "-"]

  while (result.length !== 1) {
    for (let i = 0; i < result.length; i++) {
      if (!isNaN(result[i])) continue

      if (operators.includes(result[i])) {
        const operator = result[i]

        const firstValue = result[i - 2]
        const secondValue = result[i - 1]

        switch (operator) {
          case "*":
            result.splice(i + 1, 0, firstValue * secondValue)
            result.splice(i, 1)
            result.splice(i - 2, 1)
            result.splice(i - 2, 1)
            break

          case "/":
            result.splice(i + 1, 0, firstValue / secondValue)
            result.splice(i, 1)
            result.splice(i - 2, 1)
            result.splice(i - 2, 1)
            break

          case "%":
            result.splice(i + 1, 0, firstValue % secondValue)
            result.splice(i, 1)
            result.splice(i - 2, 1)
            result.splice(i - 2, 1)
            break

          case "+":
            result.splice(i + 1, 0, firstValue + secondValue)
            result.splice(i, 1)
            result.splice(i - 2, 1)
            result.splice(i - 2, 1)
            break

          case "-":
            result.splice(i + 1, 0, firstValue - secondValue)
            result.splice(i, 1)
            result.splice(i - 2, 1)
            result.splice(i - 2, 1)
            break
        }
        break
      }
    }
  }

  return result
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

const getEvaluation = () => {
  const args = getArgs()

  const validLength = args.length === 1
  if (!isValidLength(validLength)) return

  const expressions = args[0]
    .replaceAll(" ", "")
    .split(/(?<=[\(\)\*\+\/\-%])|(?=[\(\)\*\+\/\-%])/)

  const postfix = myShuntingYard(expressions)

  return evalPostfix(postfix).join("")
}

console.log(getEvaluation())
