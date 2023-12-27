import sys

grid = sys.argv[1]
with open(grid, 'r') as fp:
    grid_data = fp.read()
    
grid_lines = grid_data.split('\n')
grid = [list(line) for line in grid_lines if line]

def n_valide(y,x,n):
    global grid
    n = str(n)
    for x0 in range(len(grid)):
        if grid[y][x0] == n:
            return False
        
    for y0 in range(len(grid)):
        if grid[y0][x] == n:
            return False
    
    x0 = (x//3) * 3
    y0 = (y//3) * 3
    for i in range(0,3):
        for j in range(0,3):
            if grid[y0+i][x0+j] == n:
                return False
    
    return True
    
def solve():
    global grid
    for y in range(9):
        for x in range(9):
            if grid[y][x] == ".":
                for n in range(1,10):
                    if n_valide(y, x, n):
                        grid[y][x] = n
                        solve()
                        grid[y][x] = "."
                return
    for i in range(9):
        for j in range(9):
            print(grid[i][j], end =" ")
        print()
        
solve()