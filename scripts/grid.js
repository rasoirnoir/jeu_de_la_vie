
var taille = 20; // on décide que la grille sera toujours un carré
var nbImagesSecs = 1;
var jeu = matrice(taille);
var nbIte = 0;
//console.log(jeu);
var grid = clickableGrid(taille,function(el,row,col){
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


document.body.appendChild(grid);

document.getElementById("theButton").addEventListener("click", demarrer);

//construction de la grille de depart (tut est blanc)
function clickableGrid(_taille, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<_taille;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<_taille;++c){
            var cell = tr.appendChild(document.createElement('td'));
            //cell.innerHTML = ++i;
            cell.addEventListener('click',(function(el,r,c){
                return function(){
                    callback(el,r,c);
                }
            })(cell,r,c),false);
        }
    }
    return grid;
}

//Définition de la matrice qui servira a calculer la grille
//@_taille on part du principe que la matrice sera toujours carrée
function matrice(_taille){
  //Initialisation de la matrice de base, où tout est à 0 (blanc, mort)
  var matrix = [];
  for(var r = 0; r < _taille; r++){
    var column = [];
    for(var c = 0; c < _taille; c++){
      //console.log(`r : ${r}, c : ${c}`);
      column[c] = 0;
      //matrix[r][c] = 0;
    }
    matrix[r] = column;
  }
  return matrix;
}


var intervalID;
function demarrer(){
  var theButton = document.getElementById("theButton");
  theButton.value = "stopper";
  theButton.removeEventListener("click", demarrer);
  theButton.addEventListener("click", stopper);

  //TODO: lancer la simulation
  intervalID = window.setInterval(iterationSimu, 1000/nbImagesSecs);

}

function stopper(){
  var theButton = document.getElementById("theButton");
  theButton.value = "démarrer";
  theButton.removeEventListener("click", stopper);
  theButton.addEventListener("click", demarrer);

  //TODO: arrêter la simulation
  window.clearInterval(intervalID);
  nbIte = 0;

}

function iterationSimu(){
  //TODO: calculer chaque itération du jeu
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
        grid.rows[i].getElementsByTagName("td")[j].className = 'white';
      }
      else{
        //grid[i][j].className = 'black';
        grid.rows[i].getElementsByTagName("td")[j].className = 'black';
      }
    }
  }
}
