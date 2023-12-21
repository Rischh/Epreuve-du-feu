import sys

def result_of(arith):
# the position of operator
    addition = "+"
    substraction = "-"
    multiplication = "*"
    division = "/"
    modulo = "%"
    left_parenthesis = "("
    right_parenthesis = ")"
    
    lst = []
    for i, char in enumerate(arith):
# sense of priority
        # if char == left_parenthesis:
        #     lst.append(i)
        # elif char == right_parenthesis:
        #     lst.append(i)
        #     print(lst)
        #     if multiplication 
            # if char == multiplication:
            #     lst.append(i)
            # elif char == division:
            #     lst.append(i)
            # elif char == modulo:
            #     lst.append(i)
                
            #     if char == multiplication:
            #         lst.append(i)
            #     elif char == division:
            #         lst.append(i)
            #     elif char == modulo:
            #         lst.append(i)
                
                
                    if char == addition or char == substraction:
                        lst.append(i)
                
           
# the positions of numbers behind and in front (list)  
    behind = list(map(lambda x : x - 2, lst))
    front = list(map(lambda x : x + 2, lst))
            
# transform list to int
    behind_list = map(str, behind)
    behind_value = ''.join(behind_list)
    b_number = int(behind_value)
            
    front_list = map(str, front)
    front_value = ''.join(front_list)
    f_number = int(front_value)
            
         
# transform string into a list
    arith_list = list(arith)
    return (int(arith_list[b_number]) + int(arith_list[f_number])) or (int(arith_list[b_number]) - int(arith_list[f_number]))
    

    
          
arithmetic_progression = sys.argv[1]

result = result_of(arithmetic_progression)

print(result)

