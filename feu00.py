import sys

def error_handling(string):
    if not len(string) == 3 or not string[1].isdigit() or not string[2].isdigit():
        print("Error!")
        sys.exit()
        
def rectangle(s_ln,s_wid):
    s_ln = int(s_ln)
    s_wid = int(s_wid)  

    # length of the rectangle
    ln_list = []

    for i in range(s_ln):
        ln_list.append(i)
    
    ln_list[0], ln_list[-1] = "o", "o"
    btwn_first_last = slice(1, -1)
    ln_list[btwn_first_last] = ["-"] * (len(ln_list) - 2)
    ln = ' '.join(ln_list)
    
    print(ln)
    
    # width of the rectangle
    
    wid_list = []

    for i in range(s_wid):
        wid_list.append(i)
    
    wid_list[btwn_first_last] = ["|"] * (len(wid_list) - 2)
    del wid_list[0], wid_list[-1]
    for i in wid_list:
        espace = len(ln)-4
        print(i, " "*espace, i)
            
    print(ln)
    
error_handling(sys.argv)      
 
size_length = sys.argv[1]
size_width = sys.argv[2]


            
rectangle(size_length,size_width)