(function() {

  'use strict';

  var ENTER_KEY = 13;
  var newGameDom = document.getElementById('new-game');
  var syncDom = document.getElementById('sync-wrapper');

  // EDITING STARTS HERE (you dont need to edit anything above this line)

  var dbcollection = new PouchDB('Collection');
  var db = new PouchDB('Database');
  var remoteCouch = false;
  
  db.info(function(err, info) {
    db.changes({
      since: info.update_seq,
      live: true
    }).on('change', showGames);
  });

  // We have to create a new game document and enter it in the database
  function addGame(_title, _popularity, _difficulty, _releaseYear, _hoursToComplete, _intensity, _violence, _image) {
  var game = {
    _id: new Date().toISOString() + _title,
    title: _title,
    popularity: _popularity,
    difficulty: _difficulty,
    releaseYear: _releaseYear,
    retroness: _releaseYear,
    hours: _hoursToComplete,
    length: _hoursToComplete,
    intensity: _intensity,
    violence: _violence,
    splash: _image
  };
  db.put(game, function callback(err, result) {
    if (!err) {
      console.log('Successfully added a game!');
    }
  });
    
 function addCollection(_title, _popularity, _difficulty, _releaseYear, _hoursToComplete, _intensity, _violence, _image) {
  var game = {
    _id: new Date().toISOString() + _title,
    title: _title,
    popularity: _popularity,
    difficulty: _difficulty,
    releaseYear: _releaseYear,
    retroness: _releaseYear,
    hours: _hoursToComplete,
    length: _hoursToComplete,
    intensity: _intensity,
    violence: _violence,
    splash: _image
  };
  dbcollection.put(game, function callback(err, result) {
    if (!err) {
      console.log('Successfully added a game!');
    }
  });
}

  // Show the current list of games by reading them from the database
  function showGames() {
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
      redrawGamesUI(doc.rows);
    }).catch(function (err) {
      console.log(err);
    });
  }

  function checkboxChanged(game, event) {
  game.completed = event.target.checked;
  db.put(game);
}

  // User pressed the delete button for a game, delete it
  function deleteButtonPressed(game) {
  db.remove(game);
}

  // The input box when editing a game has blurred, we should save
  // the new title or delete the game if the title is empty
  function gameBlurred(game, event) {
  var trimmedText = event.target.value.trim();
  if (!trimmedText) {
    db.remove(game);
  } else {
    game.title = trimmedText;
    db.put(game);
  }
}

  // Initialise a sync with the remote server
  function sync() {
  }

  // EDITING STARTS HERE (you dont need to edit anything below this line)

  // There was some form or error syncing
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }

  // User has double clicked a game, display an input so they can edit the title
  function gameDblClicked(game) {
    var div = document.getElementById('li_' + game._id);
    var inputEditGame = document.getElementById('input_' + game._id);
    div.className = 'editing';
    inputEditGame.focus();
  }

  // If they press enter while editing an entry, blur it to trigger save
  // (or delete)
  function gameKeyPressed(game, event) {
    if (event.keyCode === ENTER_KEY) {
      var inputEditGame = document.getElementById('input_' + game._id);
      inputEditGame.blur();
    }
  }

  // Given an object representing a todo, this will create a list item
  // to display it.
  function createGameListItem(game) {
    var checkbox = document.createElement('input');
    checkbox.className = 'toggle';
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', checkboxChanged.bind(this, game));

    var label = document.createElement('label');
    label.appendChild( document.createTextNode(game.title));
    label.addEventListener('dblclick', gameDblClicked.bind(this, game));

    var deleteLink = document.createElement('button');
    deleteLink.className = 'destroy';
    deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, game));

    var divDisplay = document.createElement('div');
    divDisplay.className = 'view';
    divDisplay.appendChild(checkbox);
    divDisplay.appendChild(label);
    divDisplay.appendChild(deleteLink);

    var inputEditGame = document.createElement('input');
    inputEditGame.id = 'input_' + game._id;
    inputEditGame.className = 'edit';
    inputEditGame.value = game.title;
    inputEditGame.addEventListener('keypress', gameKeyPressed.bind(this, game));
    inputEditGame.addEventListener('blur', gameBlurred.bind(this, game));

    var li = document.createElement('li');
    li.id = 'li_' + game._id;
    li.appendChild(divDisplay);
    li.appendChild(inputEditGame);

    if (game.completed) {
      li.className += 'complete';
      checkbox.checked = true;
    }

    return li;
  }

  function redrawGamesUI(games) {
    var ul = document.getElementById('game-list');
    ul.innerHTML = '';
    games.forEach(function(game) {
      ul.appendChild(createGameListItem(game.doc));
    });
  }

  function newGameKeyPressHandler( event ) {
    if (event.keyCode === ENTER_KEY) {
      addGame(newGameDom.value);
      newGameDom.value = '';
    }
  }

  function addEventListeners() {
    newGameDom.addEventListener('keypress', newGameKeyPressHandler, false);
  }

  addEventListeners();
  showGames();

  if (remoteCouch) {
    sync();
  }

})();
