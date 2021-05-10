(function() {

  'use strict';

  var ENTER_KEY = 13;
  var newTodoDom = document.getElementById('new-game');

var collection = new PouchDB('collection');
var remoteCouch = false;

db.changes({
  since: 'now',
  live: true
}).on('change', showGames());

function addGame(title, pop, dif, inte, vio, hours, rel, img) {
  var game = {
    _id: new Date().toISOString(),
    _title: title,
    _popularity: pop,
    _difficulty: dif,
    _intensity: inte,
    _violence: vio,
    _hoursToComplete: hours,
    _relaseYear: rel,
    _image: img
  };
  collection.put(game, function callback(err, result) {
    if (!err) {
      console.log('Successfully added game to your collection!');
    }
  });
}
    
function showGames() {
  collection.allDocs({include_docs: true, descending: true}, function(err, doc) {
    redrawGamesUI(doc.rows);
  });
}

function deleteButtonPressed(game) {
  collection.remove(game);
}
  
function createGameListItem(game) {
  
  var title = document.createElement('label');
  title.appendChild( document.createTextNode(game._title));
  
  var pop = document.createElement('label');
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
  image.appendChild( document.createTextNode(game._image));

  var deleteLink = document.createElement('button');
  deleteLink.className = 'destroy';
  deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));

  var divDisplay = document.createElement('div');
  divDisplay.className = 'view';
  divDisplay.appendChild(image);
  divDisplay.appendChild(title);
  divDisplay.appendChild(pop);
  divDisplay.appendChild(dif);
  divDisplay.appendChild(inte);
  divDisplay.appendChild(vio);
  divDisplay.appendChild(hours);
  divDisplay.appendChild(rel);
  divDisplay.appendChild(deleteLink);

  var inputEditTodo = document.createElement('input');
  inputEditTodo.id = 'input_' + game._id;
  inputEditTodo.className = 'edit';
  inputEditTodo.value = game._title;
  inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));

  var li = document.createElement('li');
  li.id = 'li_' + game._id;
  li.appendChild(divDisplay);
  li.appendChild(inputEditTodo);

  return li;
}
