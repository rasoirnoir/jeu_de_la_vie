# jeu_de_la_vie
Implémentation d'un automate cellulaire célèbre. Pour le plaisir.
Le Jeu de la Vie

Les règles sont simple:

le jeu se déroule dans une grille potentiellement infinie.
pour chaque cellule composant cette grille, 2 règles sont à appliquer à chaque tour de jeu:

    1) Elle survie si elle est entourée de 2 ou 3 voisines vivantes. Sinon elle meure.
    2) Elle nait si elle est entourée d'exactement 3 voisines.
