var lastClicked;
var taille = 20; // on décide que la grille sera toujours un carré
var nbImagesSecs = 10;
var jeu = matrice(taille);
console.log(jeu);
var grid = clickableGrid(taille,function(el,row,col){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);

    if(el.className == 'black'){
      el.className = 'white';
    }
    else{
      el.className = 'black';
    }
    //el.className='clicked';
    //if (lastClicked) lastClicked.className='';
    lastClicked = el;
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

}

function iterationSimu(){
  //TODO: calculer chaque itération du jeu
  console.log("Itération du jeu !");
}
