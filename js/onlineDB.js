(function() {

  'use strict';

  var ENTER_KEY = 13;
  var newGameDom = document.getElementById('new-game-title-db');
  var syncDom = document.getElementById('sync-wrapper');

var db = new PouchDB('allgames');
var remoteCouch = '';

db.info(function(err, info) {
 db.changes({
    since: 'now',
    live: true
  }).on('change', showGames);
});

function addGame(_title /*, pop, dif, inte, vio, hours, rel, img*/) {
  var game = {
    _id: new Date().toISOString(),
    title: _title,
    /*_popularity: pop,
    _difficulty: dif,
    _intensity: inte,
    _violence: vio,
    _hoursToComplete: hours,
    _relaseYear: rel,
    _image: img*/
  };
  db.put(game).then(function (result) {
    console.log("game added successfully");
    console.log(result);
  }).catch(function (err) {
    console.log("game add failure");
    console.log(err);
  });
}
    
function showGames() {
  //console.log("attempt to show games")
  db.allDocs({include_docs: true, descending: true}).then(function(doc) {
    redrawGamesUI(doc.rows);
  }).catch(function (err) {
    console.log(err);
  });
}

function deleteButtonPressed(game) {
  db.remove(game);
}
  
function createGameListItem(game) {
  
  var title = document.createElement('label');
  title.appendChild( document.createTextNode(game.title));
  
  /*var pop = document.createElement('label');
  pop.appendChild( document.createTextNode(game._popularity));
  
  var dif = document.createElement('label');
  dif.appendChild( document.createTextNode(game._difficulty));
  
  var inte = document.createElement('label');
  inte.appendChild( document.createTextNode(game._intensity));
  
  var vio = document.createElement('label');
  vio.appendChild( document.createTextNode(game._violence));
  
  var hours = document.createElement('label');
  hours.appendChild( document.createTextNode(game._hoursToComplete));
  
  var rel = document.createElement('label');
  rel.appendChild( document.createTextNode(game._releaseYear));
  
  var image = document.createElement('img');
  image.appendChild( document.createTextNode(game._image)); */

  var deleteLink = document.createElement('button');
  deleteLink.className = 'destroy';
  deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, game));

  var divDisplay = document.createElement('div');
  divDisplay.className = 'view';
  //divDisplay.appendChild(image);
  divDisplay.appendChild(title);
  /*divDisplay.appendChild(pop);
  divDisplay.appendChild(dif);
  divDisplay.appendChild(inte);
  divDisplay.appendChild(vio);
  divDisplay.appendChild(hours);
  divDisplay.appendChild(rel);*/
  divDisplay.appendChild(deleteLink);

  var inputEditGame = document.createElement('input');
  inputEditGame.id = 'input_' + game._id;
  inputEditGame.className = 'edit';
  inputEditGame.value = game.title;
  inputEditGame.addEventListener('keypress', gameKeyPressed.bind(this, game));

  var li = document.createElement('li');
  li.id = 'li_' + game._id;
  li.appendChild(divDisplay);
  li.appendChild(inputEditGame);
  console.log(li)
  
  return li;
}
  
function redrawGamesUI(games) {
  //console.log("attempt to redraw UI");
  var ul = document.getElementById('game-list-db');
  ul.innerHTML = '';
  //console.log(games);
  games.forEach(function(game) {
    ul.appendChild(createGameListItem(game.doc));
  });
}
  

function gameKeyPressed(game, event) {
  if (event.keyCode === ENTER_KEY) {
    var inputEditGame = document.getElementById('input_' + game._id);
    inputEditGame.blur();
  }
}

function newGameKeyPressHandler( event ) {
  //console.log(event.keyCode);
  if (event.keyCode === ENTER_KEY) {
    addGame(newGameDom.value);
    newGameDom.value = '';
  }
}

function addEventListeners() {
  newGameDom.addEventListener('keypress', newGameKeyPressHandler, false);
}
  
function sync() {
  syncDom.setAttribute('data-sync-state', 'syncing');
  var opts = {live: true};
  db.replicate.to(remoteCouch, opts, syncError);
  db.replicate.from(remoteCouch, opts, syncError);
}
  
function syncError() {
  syncDom.setAttribute('data-sync-state', 'error');
}

addEventListeners();
showGames();
  
if (remoteCouch) {
  sync();
}

})();
