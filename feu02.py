import sys

def error_handling():
    if len(sys.argv) != 3:
        print("Erreur !")
        sys.exit(1)

    try:
        with open(board_file, 'r') as fp:
            board_data = fp.read()
    except FileNotFoundError:
        print(f"Erreur : fichier {board_file} introuvable.")
        sys.exit(1)
    
    try:
        with open(find_file, 'r') as fp:
            find_data = fp.read()
    except FileNotFoundError:
        print(f"Erreur : fichier {find_file} introuvable.")
        sys.exit(1)

    return board_file, find_file

def find_element_board(b, f):
    with open(b, 'r') as fp:
        board_data = fp.read()
        
    board_lines = board_data.split('\n')
    board = [list(line) for line in board_lines if line]
        
    with open(f, 'r') as fp:
        find_data = fp.read()

    find_lines = find_data.split('\n')
    find = [list(line) for line in find_lines if line]

    for i in range(len(board) - len(find) + 1):
        for j in range(len(board[0]) - len(find[0]) + 1):
            match = True
            for x in range(len(find)):
                for y in range(len(find[0])):
                    if find[x][y] == ' ':
                        continue
                    if i + x >= len(board) or j + y >= len(board[0]):
                        continue 
                    if board[i + x][j + y] != find[x][y]:
                        match = False
                        break
                if not match:
                    break
            if match:
                print("Trouvé !")
                print(f"Coordonées : {j}, {i}")
                for x in range(len(board)):
                    for y in range(len(board[0])):
                        if x >= i and x < i + len(find) and y >= j and y < j + len(find[0]):
                            print(find[x - i][y - j], end='')
                        else:
                            print('-', end='')
                    print()
                return

    print("Introuvable")
    
board_file = sys.argv[1]
find_file = sys.argv[2]

board_file, find_file = error_handling()

find_element_board(board_file, find_file)



