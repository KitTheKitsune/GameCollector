

function searchForGame(){
  var inputVal = document.getElementById("gameTitleInput").value;
  var ourGame = null;
  
  if (true){
    document.getElementById("searchResults").innerHTML = inputVal + " not found.";
    document.getElementById("addToDatabaseButton").style.display = "inline";
  }else{
    addGameToCollections(ourGame);
  }
};

function showAddToDatabaseForm(){
  //show the add form
  document.getElementById("addForm").style.display = "block";

  //hide the input form
  document.getElementById("inputForm").style.display = "none";

};

function addToDatabase(){
  //hide the add form
  document.getElementById("addForm").style.display = "none";

  //show input new form
  document.getElementById("inputForm").style.display = "block";

  //pull data from new form
  var title = document.getElementById("inputTitle").value;
  var popularity = document.getElementById("inputPopularity").value;
  var difficulty = document.getElementById("inputDifficulty").value;
  var length = document.getElementById("inputLength").value;
  var retroness = document.getElementById("inputRetroness").value;
  var intensity = document.getElementById("inputIntensity").value;
  var violence = document.getElementById("inputViolence").value;
  
  //insert game object into database
  
};

function addGameToCollection(game) {
  //create a new div
  const newDiv = document.createElement("div");
  newDiv.style = "outline-width: 2px; outline-style: solid;";
  
  //create game object
  

  //give it content
  const image = document.createElement("img");
  image.src = "images/GenericGameImage.png";
  var content = document.createTextNode(game.title);
  var breakline = document.createElement("br");

  //add the text node to the new div
  newDiv.appendChild(image);
  newDiv.appendChild(breakline);
  newDiv.appendChild(content);
  breakline = document.createElement("br");
  newDiv.appendChild(breakline);

  //repeat
  content = document.createTextNode("Popularity: " + game.popularity);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Difficulty: " + game.difficulty);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Length: " + game.length);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Retroness: " + game.retroness);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Intensity: " + game.intensity);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Violence: " + game.violence);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);

  //insert
  const currentDiv = document.getElementById("insertBefore");
  document.getElementById("manual").insertBefore(newDiv,currentDiv);
};


