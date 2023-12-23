import sys

arithmetic_progression = sys.argv[1]

def find_op(arith_list, op):
    index = [n for (n, e) in enumerate(arith_list) if e == op]
    return index[0] if index else -1

def behind(op):
    return op - 1

def front(op):
    return op + 1

def calculate(expression):
    while '(' in expression:
        parenthesis_index = []

        operator = '('     
        op_index_open = find_op(expression, operator)
        parenthesis_index.append(op_index_open)

        operator = ')'
        op_index_close = find_op(expression, operator)
        parenthesis_index.append(op_index_close)

        sub_expression = expression[parenthesis_index[0] + 1:parenthesis_index[1]]

        # Boucle pour les opérations *, /, %
        while '*' in sub_expression or '/' in sub_expression or '%' in sub_expression:
            for i, token in enumerate(sub_expression):
                if token in ['*', '/', '%']:
                    operator = token
                    b = i - 1
                    f = i + 1
                    calcul = (
                        float(sub_expression[b]) * float(sub_expression[f]) if operator == '*' else
                        float(sub_expression[b]) / float(sub_expression[f]) if operator == '/' else
                        float(sub_expression[b]) % float(sub_expression[f])
                    )
                    sub_expression[b:f+1] = [str(calcul)]

        # Boucle pour les opérations +, -
        while '+' in sub_expression or '-' in sub_expression:
            for i, token in enumerate(sub_expression):
                if token in ['+', '-']:
                    operator = token
                    b = i - 1
                    f = i + 1
                    calcul = (
                        float(sub_expression[b]) + float(sub_expression[f]) if operator == '+' else
                        float(sub_expression[b]) - float(sub_expression[f])
                    )
                    sub_expression[b:f+1] = [str(calcul)]

        expression[parenthesis_index[0]:parenthesis_index[1]+1] = sub_expression

    # Boucle pour les opérations *, /, %
    while '*' in expression or '/' in expression or '%' in expression:
        for i, token in enumerate(expression):
            if token in ['*', '/', '%']:
                operator = token
                b = i - 1
                f = i + 1
                calcul = (
                    float(expression[b]) * float(expression[f]) if operator == '*' else
                    float(expression[b]) / float(expression[f]) if operator == '/' else
                    float(expression[b]) % float(expression[f])
                )
                expression[b:f+1] = [str(calcul)]

    # Boucle pour les opérations +, -
    while '+' in expression or '-' in expression:
        for i, token in enumerate(expression):
            if token in ['+', '-']:
                operator = token
                b = i - 1
                f = i + 1
                calcul = (
                    float(expression[b]) + float(expression[f]) if operator == '+' else
                    float(expression[b]) - float(expression[f])
                )
                expression[b:f+1] = [str(calcul)]

    print(expression[0])

result = calculate(arithmetic_progression.split())

