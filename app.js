let url = "http://ergast.com/api/f1/current/next.json";


var SeasonButton = document.getElementById("SeasonButton");
var SeasonInput = document.getElementById("SeasonInputID");
SeasonButton.addEventListener("click", displaySeasonData, false);
SeasonInput.addEventListener("keyup", function(e) { if (e.keyCode === 13) {e.preventDefault();SeasonButton.click();} });

async function displaySeasonData(){
  let season = parseInt(SeasonInput.value);
  let data = await getSeasonData(season);
  //console.log(season);
  console.log(data);
  document.getElementById("test").textContent = JSON.stringify(data, null, "\t");
}


async function getSeasonData(season){
  let requestURL = `http://ergast.com/api/f1/${season}.json`;
  let request = await fetch(requestURL);
  let json = await request.json();

  //console.log(json);
  return json;
}
