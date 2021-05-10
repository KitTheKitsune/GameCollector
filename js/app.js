function calcRetroness(year) {
  year = parseInt(year);
  const oldest = 1970;
  const yearsSince = year - oldest;
  var max = new Date().getFullYear() - oldest;
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

function selectSection(sectionName) {
  document.getElementById("homescreen").style.display = "none";
  document.getElementById(sectionName).style.display = "block";
}

function regSW(){
  
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
};

function back(sectionName){
  document.getElementById("homescreen").style.display = "block";
  document.getElementById(sectionName).style.display = "none";
};
