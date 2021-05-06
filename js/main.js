function regSW(){
  
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
};

class Game {
  constructor(){
    this.title = "game not found";
    this.popularity = 1;
    this.difficulty = 1;
    this.hours = 80;
    this.length = calcLength(this.hours);
    this.releaseYear = 1940
    this.retroness = calcRetroness(this.releaseYear);
    this.intensity = 1;
    this.violence = 1;
  };
  
  constructor(title){
    this.title = title;
    this.popularity = 1;
    this.difficulty = 1;
    this.hours = 80;
    this.length = calcLength(this.hours);
    this.releaseYear = 1940
    this.retroness = calcRetroness(this.releaseYear);
    this.intensity = 1;
    this.violence = 1;
  };
  
  constructor(title, popularity, difficulty, hours, releaseYear, intensity, violence){
    this.title = title;
    this.popularity = popularity;
    this.difficulty = difficulty;
    this.hours = hours;
    this.length = calcLength(hours);
    this.releaseYear = releaseYear;
    this.retroness = calcRetroness(releaseYear);
    this.intensity = intensity;
    this.violence = violence;
  };
  
  //getters
  get title(){
    return this.title;
  };
  
  get popularity(){
    return this.popularity;
  };
  
  get difficulty(){
    return this.difficulty;
  };
  
  get hours(){
    return this.hours;
  };
  
  get length(){
    return this.length;
  };
  
  get releaseYear(){
    return this.releaseYear;
  };
  
  get retroness(){
    return this.retroness;
  };
  
  get intensity(){
    return this.intensity;
  };
  
  get violence(){
    return this.violence;
  };
};

class Database {
  constructor(){
    this.gameList = [];
  };
  
  get gameList(){
    return this.gameList;
  };
  
  addGame(game){
    this.gameList.push(game);
  };
  
  findGame(gameTitle){
     for (let i = 0; i < this.gameList.length; i++){
       if (this.gameList[i].title() == gameTitle){
         return this.gameList[i];
       }
     }
    return new Game();
  };
  
};
  
var Database = new Database();

function selectionClick(id){
      document.getElementById("HomeScreen").style.display = "none";
      document.getElementById(id).style.display = "block";
};

function backClick(id){
  document.getElementById("HomeScreen").style.display = "block";
  document.getElementById(id).style.display = "none";
};

function searchForGame(){
  var inputVal = document.getElementById("gameTitleInput").value;
  var ourGame = Database.findGame(inputVal);
  
  if (outGame.title().equals("game not found")){
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
  
  const newGame = new Game(title, popularity, difficulty, length, retroness, intensity, violence);

  //insert data into collections
  addGameToCollections(newGame);
  
  //insert game object into database
  
};

function addGameToCollections(game) {
  //create a new div
  const newDiv = document.createElement("div");
  newDiv.style = "outline-width: 2px; outline-style: solid;";
  
  //create game object
  

  //give it content
  const image = document.createElement("img");
  image.src = "images/GenericGameImage.png";
  var content = document.createTextNode(game.title());
  var breakline = document.createElement("br");

  //add the text node to the new div
  newDiv.appendChild(image);
  newDiv.appendChild(breakline);
  newDiv.appendChild(content);
  breakline = document.createElement("br");
  newDiv.appendChild(breakline);

  //repeat
  content = document.createTextNode("Popularity: " + game.popularity());
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Difficulty: " + game.difficulty());
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Length: " + game.length());
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Retroness: " + game.retroness());
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Intensity: " + game.intensity());
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Violence: " + game.violence());
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);

  //insert
  const currentDiv = document.getElementById("insertBefore");
  document.getElementById("manual").insertBefore(newDiv,currentDiv);
};

function calcRetroness(year) {
  year = parseInt(year);
  const oldest = 1987;
  const yearsSince = year - 1987;
  var max = new Date().getFullYear() - 1987;
  var out = max / yearsSince;
  return Math.round(out * 10) / 10;
};

function calcLength(hours) {
  hours = parseInt(hours);
  if (hours > 80) {
    hours = 80;
  }
  var out = hours / 80 * 10;
  return Math.round(out * 10) / 10;
};
