const playerSearchTextBox = document.getElementById('playerSearchTextBox')
const btnPlayers = document.getElementById('btnPlayers')
const playersUL = document.getElementById('playersUL')
const playerInfo = document.getElementsByClassName('playerInfo')
const extraDiv = document.getElementById('extraDiv')
let noStatsDiv = document.getElementById('noStatsDiv')
const modalBody = document.getElementsByClassName('modal-body')

btnPlayers.addEventListener('click', function () {
  extraDiv.innerHTML = ''
  playersUL.innerHTML = ''
  noStatsDiv.innerHTML = ''
  playerSearch()
})

function playerSearch() {
  playersUL.innerHTML = ''
  let searchPlayer = playerSearchTextBox.value
  let playersURL = `https://www.balldontlie.io/api/v1/players?search=${searchPlayer}`
  fetch(playersURL)
    .then((response) => {
      return response.json()
    }).then((playerInfo) => {
      console.log(playerInfo)
      let specificPlayer = playerInfo.data.map((searchPlayer) => {
        return `<li class="bullets">Name: ${searchPlayer.first_name} ${searchPlayer.last_name}</li>
                <li class="bullets">Position: ${searchPlayer.position}</li>
                <li class="bullets">Team: ${searchPlayer.team.abbreviation}</li>
                <li class="bullets">Height: ${searchPlayer.height_feet}'${searchPlayer.height_inches}"</li>
                <li class="bullets">Weight: ${searchPlayer.weight_pounds} lbs</li>
                <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#exampleModalCenter" id='playerSeasonStats' onclick='playerStats(${searchPlayer.id})'>Get Season Stats!</button>
                
               </li>
               <div class='playerInfo'></div>
               `
        

      })
      
      playersUL.innerHTML = specificPlayer

    })
}





function playerStats(playerId) {
  
  let statsURL = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`
  console.log(statsURL)
  fetch(statsURL)
    .then((response) => {
      return response.json()
    }).then((statistics) => {
      extraDiv.innerHTML = ''
      console.log(statistics)
      if(statistics.data.length == 1) {
        console.log(statistics.length)

      let specificStats = statistics.data.map((seasonsAverages) => {
        
        return `
                <h2>Current Season Averages</h2>
                <h4>
                  mpg: ${seasonsAverages.min}<br>
                  pts: ${seasonsAverages.pts}<br>
                  fg%: ${seasonsAverages.fg_pct}<br>
                  3pt%: ${seasonsAverages.fg3_pct}<br>
                  reb: ${seasonsAverages.reb}<br>
                  ast: ${seasonsAverages.ast}<br>
                  stl: ${seasonsAverages.stl}

               </h4>
               
               `

      })
      extraDiv.insertAdjacentHTML('beforeend', specificStats)
    } else {
      extraDiv.innerHTML = `<h3 style="font-weight: 200">Sorry, player is no longer active.</h3>`
      
    }
  

    })
}

console.log(players)
