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

function addGame(title, pop, dif, inte, vio, hours, rel) {
  var game = {
    _id: new Date().toISOString(),
    _title: title,
    _popularity: pop,
    _difficulty: dif,
    _intensity: inte,
    _violence: vio,
    _hoursToComplete: hours,
    _relaseYear: rel
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
