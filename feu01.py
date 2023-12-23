import sys

arithmetic_progression = sys.argv[1]

def find_op(arith, op):
    arith_list = arith.split()
    index = [n for (n, e) in enumerate(arith_list) if e == op]
    return index[0]

def behind(op):
    behind = op - 1
    return behind

def front(op):
    front = op + 1
    return front

def result_of(arith):
    arith_list = arith.split()
    
    if '(' in arith_list:
        parenthesis_index = []
        
        operator = '('     
        op_index = find_op(arith,operator)
        parenthesis_index.append(op_index)

        operator = ')'
        op_index = find_op(arith,operator)
        parenthesis_index.append(op_index)
        
        sub_expression = arith_list[parenthesis_index[0] + 1:parenthesis_index[1]]

result_of(arithmetic_progression)

# while "+" in arith_list:
    #     operator = '+'
                            
    #     op_index = find_op(arith,operator)
    #     b = behind(op_index)
    #     f = front(op_index)
                            
    #     calcul = int(arith_list[b]) + int(arith_list[f])
    #     arith_list = arith_list[:b] + [str(calcul)] + arith_list[f+1:]
                    
    # print(arith_list)