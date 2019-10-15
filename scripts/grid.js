var lastClicked;
var taille = 20; // on décide que la grille sera toujours un carré
var jeu = matrice(taille);
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
  for( var r = 0; r < _taille; r++){
    for(var c = 0; c < _taille; c++){
      matrix[r, c] = 0;
    }
  }
  return matrix;
}
