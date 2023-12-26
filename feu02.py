import sys

board_file = sys.argv[1]
find_file = sys.argv[2]

def find_element_board(board_file, find_file):
    with open(find_file, 'r') as f:
        find_data = f.read().strip()

    with open(board_file, 'r') as fp:
        found = False
        for l_no, line in enumerate(fp):
            if find_data in line:
                col_no = line.index(find_data)
                print("Trouvé !")
                print(f"Coordonées : {col_no,l_no}")
                found = True
                break

        if not found:
            print("Non trouvé")

# Exemple d'utilisation
find_element_board(board_file, find_file)