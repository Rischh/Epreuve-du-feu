import sys

arithmetic_progression = sys.argv[1]

def find_op(arith, op):
    index = [n for (n, e) in enumerate(arith) if e == op]
    return index

def split_list(lst):
    new_list = []
    for ele in lst:
        new_list.append([ele])
    return new_list[0]
        

def behind_front(lst):
    new_lst = []
    for i in lst:
        behind = list(map(lambda x : x - 2, i))
        front = list(map(lambda x : x + 2, i))
        
        two_element = behind + front    
        
        new_lst.append(two_element)
  
    return new_lst

def result_of(arith):
    for i in arith:
        if i == "+":
            operator = '+'
            
            op_index = find_op(arith,operator)

            # b_f = behind_front(each_index)
    
    print(op_index)
    # print(each_index)
    # print(b_f)

result_of(arithmetic_progression)
       
        # elif i == "-":
        #     sub_index = [n for (n, e) in enumerate(arith) if e == '-']
        # elif i == "*":
        #     mul_index = [n for (n, e) in enumerate(arith) if e == '-']
        # elif i == "/":
        #     div_index = [n for (n, e) in enumerate(arith) if e == '-']
        # elif i == "%":
        #     mod_index = [n for (n, e) in enumerate(arith) if e == '-']