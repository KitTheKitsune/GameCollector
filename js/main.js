function regSW(){
  
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
}

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
  document.getElementById("searchResults").innerHTML = inputVal + " not found.";
  document.getElementById("addToDatabaseButton").style.display = "inline";
};

function addToDatabaseForm(){
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

  //insert data into collections
  createNewGame(title, popularity, difficulty, length, retroness, intensity, violence);
};

function createNewGame(tit, pop, dif, len, ret, int, vio) {
  //create a new div
  const newDiv = document.createElement("div");
  newDiv.style = "outline-width: 2px; outline-style: solid;";

  //give it content
  const image = document.createElement("img");
  image.src = "images/GenericGameImage.png";
  var content = document.createTextNode(tit);
  var breakline = document.createElement("br");

  //add the text node to the new div
  newDiv.appendChild(image);
  newDiv.appendChild(breakline);
  newDiv.appendChild(content);
  breakline = document.createElement("br");
  newDiv.appendChild(breakline);

  //repeat
  content = document.createTextNode("Popularity: " + pop);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Difficulty: " + dif);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  var length = calcLength(len);
  content = document.createTextNode("Length: " + length);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  var retroness = calcRetroness(ret);
  content = document.createTextNode("Retroness: " + retroness);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Intensity: " + int);
  breakline = document.createElement("br");
  newDiv.appendChild(content);
  newDiv.appendChild(breakline);
  content = document.createTextNode("Violence: " + vio);
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
