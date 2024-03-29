
var taille = elementById("taille").value; // on décide que la grille sera toujours un carré
//var nbImagesSecs = 2;
var jeu = matrice(taille);
var jeuDepart = jeu;
var nbIte = 0;



initGame(taille, jeu);

elementById("theButton").addEventListener("click", Demarrer);
elementById("reset").addEventListener("click", Reset);
elementById("validTaille").addEventListener("click", function(e){ChangeTaille(elementById("taille").value);});


function elementById(id){
  return document.getElementById(id);
}

function initGame(_taille, _matrice){
  //Supprime une éventuelle grille qui aurait été définie précédement
  while(elementById("jeu").hasChildNodes()){
    elementById("jeu").removeChild(elementById("jeu").lastChild);
  }

  taille = _taille;
  jeu = copyMatrice(taille, _matrice);
  //Création d'une grille clickable. Quand on clique sur une cellule, sa couleur change
  var grid = clickableGrid(taille, function(el,row,col){
      console.log("You clicked on element:",el);
      console.log("You clicked on row:",row);
      console.log("You clicked on col:",col);

      if(el.className == 'black'){
        el.className = 'white';
        jeu[row][col] = 0;
      }
      else{
        el.className = 'black';
        jeu[row][col] = 1;
      }
  });
  var cpt = document.createElement('h2');
  cpt.id = "compteur";
  cpt.innerHTML = "0";
  elementById("jeu").appendChild(cpt);
  elementById("jeu").appendChild(grid);
}

//Définition d'une grille clickable (par défault, toutes les cellules sont blanches)
function clickableGrid(_taille, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.id = "gridJeu";
    grid.className = 'grid';
    for (var r=0;r<_taille;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<_taille;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.className = 'white';
            cell.addEventListener('click',(function(el,r,c){
                return function(){
                    callback(el,r,c);
                }
            })(cell,r,c),false);
        }
    }
    return grid;
}

//crée une matrice de la taille @_taille avec les valeurs de la matrice source.
function copyMatrice(_taille, source){
  var tailleSource = source.length;
  var matrix = [];
  for(var r = 0; r < _taille; r++){
    var column = [];
    for(var c = 0; c < _taille; c++){
      //console.log(`r : ${r}, c : ${c}`);
      if(r >= tailleSource || c >= tailleSource){
        column[c] = 0;
      }
      else{
        column[c] = source[r][c];
      }
    }
    matrix[r] = column;
  }
  return matrix;
}

//Définition de la matrice qui servira a calculer la grille
//Cette matrice doit être de la même taille que la grille qui sera affichée à l'écran
//@_taille on part du principe que la matrice sera toujours carrée
function matrice(_taille){
  //Initialisation de la matrice de base, où tout est à 0 (blanc, mort)
  var matrix = [];
  for(var r = 0; r < _taille; r++){
    var column = [];
    for(var c = 0; c < _taille; c++){
      //console.log(`r : ${r}, c : ${c}`);
      column[c] = 0;
    }
    matrix[r] = column;
  }
  return matrix;
}


var intervalID;
//Se déclenche au click sur le bouton démarrer.
function Demarrer(){
  var nbImagesSecs = document.getElementById("vitesse").value;
  var theButton = document.getElementById("theButton");
  theButton.value = "Pause";
  theButton.removeEventListener("click", Demarrer);
  theButton.addEventListener("click", Pause);
  jeuDepart = jeu;
  intervalID = window.setInterval(iterationSimu, 1000/nbImagesSecs);

}

//Se déclenche au click sur le bouton pause
function Pause(){
  var theButton = document.getElementById("theButton");
  theButton.value = "démarrer";
  theButton.removeEventListener("click", Pause);
  theButton.addEventListener("click", Demarrer);

  window.clearInterval(intervalID);
}

//Se déclenche au click sur le bouton reset
function Reset(){
  Pause();
  //jeu = jeuDepart;
  jeu = copyMatrice(taille, jeuDepart);
  nbIte = 0;
  document.getElementById("compteur").innerHTML = 0;
  gridIteration(jeu);
}

function ChangeTaille(_taille){
  taille = _taille;
  initGame(taille, jeu);
  gridIteration(jeu);
}

function iterationSimu(){

  console.log(`Itération ${nbIte+1} du jeu !`);

  //chaque itération se déroulera en 2 phases
  //calcul sur la matrice
  //Mise à jour visuel de la grille
  console.log(jeu);
  var matriceSuivante = calculMatriceSuivante();
  jeu = matriceSuivante;
  console.log(jeu);

  gridIteration(jeu);
  nbIte++;
  document.getElementById("compteur").innerHTML = nbIte;

}

//Implémentation des règles du jeu de la vie
function calculMatriceSuivante(){
  var nextIte = [];
  for(var r = 0; r < taille; r++){
    var column = [];
    for(var c = 0; c < taille; c++){
      /*
      1) La cellule survie si elle est entourée de 2 ou 3 voisines. Sinon elle meure
      2) la cellule nait si elle est entourée d'exactement 3 voisines
      */
      //Récupération du nombre de voisines vivantes
      var nbVoisinesVivantes = 0;
      for(var i = -1; i <= 1; i++){
        if(!(r+i < 0 || r+i >= taille)){
          for(var j = -1; j <= 1; j++){
            if(!(c+j < 0 || c+j >= taille)){
              if(jeu[r+i][c+j] == 1 && !(i == 0 && j == 0)){
                nbVoisinesVivantes++;
              }
            }
          }
        }
      }

      if((nbVoisinesVivantes == 3) || (nbVoisinesVivantes == 2 && jeu[r][c] == 1)){
        column[c] = 1;
      }
      else{
        column[c] = 0;
      }

    }
    nextIte[r] = column;
  }
  return nextIte;
}

//Mise à jour visuel de la grille à partir de la matrice passée en paramètre
function gridIteration(matrice){
  for(var i = 0; i < taille; i++){
    for(var j = 0; j < taille; j++){
      if(matrice[i][j] == 0){
        //Récupérer la cellule dans le DOM !!
        //grid[i][j].className = 'white';
        elementById("gridJeu").rows[i].getElementsByTagName("td")[j].className = 'white';
      }
      else{
        //grid[i][j].className = 'black';
        elementById("gridJeu").rows[i].getElementsByTagName("td")[j].className = 'black';
      }
    }
  }
}
