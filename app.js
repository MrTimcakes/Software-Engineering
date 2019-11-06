let url = "http://ergast.com/api/f1/current/next.json";
var test1, test2;

var SeasonButton = document.getElementById("SeasonButton");
var SeasonInput = document.getElementById("SeasonInputID");
SeasonButton.addEventListener("click", displaySeasonData, false);
SeasonInput.addEventListener("keyup", function(e) { if (e.keyCode === 13) {e.preventDefault();SeasonButton.click();} });

async function displaySeasonData(){
  let season = parseInt(SeasonInput.value);
  let RaceTable = document.getElementById("RaceTable");
  let data = await getSeasonData(season);
  let races = data.MRData.RaceTable.Races;

  RaceTable.textContent = "";

  for(let race in races){
    var raceDiv = document.createElement("div");
    raceDiv.className = "race"
        
    Object.keys(races[race]).forEach((key)=>{
      if(key=="url"){return;}
      let newEle = document.createElement("div");
      switch(key){
        case "Circuit":
            newEle.textContent = `${key}: ${races[race][key]["circuitName"]}`;
            break;
        default:
            newEle.textContent = `${key}: ${races[race][key]}`;
            break;
      }
      raceDiv.appendChild(newEle);
    });

    RaceTable.appendChild(raceDiv);

    console.log()
    console.log(races[race]);
    // document.getElementById("RaceTable").textContent = JSON.stringify(races[race], null, "\t");
  }

  // Object.keys(races).forEach(function (k) {
  //   var li = document.createElement("li")
  //   li.textContent = k + ': ' + races[k]
  //   this.appendChild(li);
  // }, document.getElementById('RaceTable'))

  //console.log(season);
  console.log(data);
  // document.getElementById("test").textContent = JSON.stringify(data, null, "\t");
}

async function getSeasonData(season){
  let requestURL = `http://ergast.com/api/f1/${season}.json`;
  let request = await fetch(requestURL);
  let json = await request.json();
  return json;
}

SeasonButton.click();