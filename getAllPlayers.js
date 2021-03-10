const playerSearchTextBox = document.getElementById('playerSearchTextBox')
const btnPlayers = document.getElementById('btnPlayers')
const playersUL = document.getElementById('playersUL')
const playerInfo = document.getElementsByClassName('playerInfo')
const extraDiv = document.getElementById('extraDiv')


btnPlayers.addEventListener('click', function () {
  extraDiv.innerHTML = ''
  playersUL.innerHTML = ''
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
        return `<li>Name: ${searchPlayer.first_name} ${searchPlayer.last_name}</li>
                <li>Position: ${searchPlayer.position}</li>
                <li>Team: ${searchPlayer.team.abbreviation}</li>
                <li>Height: ${searchPlayer.height_feet}'${searchPlayer.height_inches}"</li>
                <li>Weight: ${searchPlayer.weight_pounds} lbs</li>
                <button type="button" class="btn btn-outline-success" id='playerSeasonStats' onclick='playerStats(${searchPlayer.id})'>Get Season Stats!</button>

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
        
               </h4>`

      })
      extraDiv.insertAdjacentHTML('beforeend', specificStats)
      // playersUL.insertAdjacentHTML('beforeend', specificStats)

    })
}