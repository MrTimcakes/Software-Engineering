let url = "//ergast.com/api/f1/current/next.json";
var test1, test2;

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

    //console.log()
    //console.log(races[race]);
    // document.getElementById("RaceTable").textContent = JSON.stringify(races[race], null, "\t");
  }

  // Object.keys(races).forEach(function (k) {
  //   var li = document.createElement("li")
  //   li.textContent = k + ': ' + races[k]
  //   this.appendChild(li);
  // }, document.getElementById('RaceTable'))

  //console.log(season);
  //console.log(data);
  // document.getElementById("test").textContent = JSON.stringify(data, null, "\t");
}

async function displayNextCircuitData(){
  let season = parseInt(SeasonInput.value);
  let RaceTable = document.getElementById("RaceTable");
  let data = await getSeasonData(season + "/next");
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
  }
}

async function getSeasonData(season){
  let requestURL = `//ergast.com/api/f1/${season}.json`;
  let request = await fetch(requestURL);
  let json = await request.json();
  return json;
}

function displayWeather(parent, lat, long, name){
  // let url = `//forecast.io/embed/#lat=${lat}&lon=${long}&name=${name}&color=#00aaff`;
  let url = `//darksky.net/widget/default/${lat},${long}/us12/en.js?width=100%&height=350&title=${name}&textColor=333333&bgColor=FFFFFF&transparency=false&skyColor=undefined&fontFamily=Default&customFont=&units=us&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes`;
  let weather = document.createElement("script")
  weather.src = url;
  parent.appendChild(weather);
}

function displayRaces(parent, data){
  let RaceTable = parent;
  //let data = await getSeasonData(season + "/next");
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
  }
}

window.addEventListener('load', async function() {
  console.log('All assets are loaded')
  // var SeasonInput = document.getElementById("SeasonInputID");
  // var SeasonButton = document.getElementById("SeasonButton");
  // var nextCircuitButton = document.getElementById("nextCircuitButton");
  // SeasonInput.addEventListener("keyup", function(e) { if (e.keyCode === 13) {e.preventDefault();SeasonButton.click();} });
  // SeasonButton.addEventListener("click", displaySeasonData, false);
  // nextCircuitButton.addEventListener("click", displayNextCircuitData, false);
  // SeasonButton.click();
  season = "current";
  seasonData = await getSeasonData(season)
  //console.log(seasonData)
  next = await getSeasonData(season+"/next")
  date = next.MRData.RaceTable.Races[0].date;
  circuitLoc = next.MRData.RaceTable.Races[0].Circuit.Location
  circuitName = next.MRData.RaceTable.Races[0].Circuit.circuitName
  displayWeather( document.getElementById("weatherDiv"), circuitLoc.lat, circuitLoc.long, circuitName )
  displayRaces(document.getElementById("upnext"), next)
  displayRaces(document.getElementById("schedule"), seasonData)
  //console.log( `//forecast.io/embed/#lat=${circuitLoc.lat}&lon=${circuitLoc.long}&name=${circuitName}&color=#00aaff` )
  
  console.log(date)
})