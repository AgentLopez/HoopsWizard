
const teamsUL = document.getElementById("teamsUL")

const divisionSelect = document.getElementById("divisionSelect")


const profileUL = document.getElementById("profileUL")

const playersRow = document.getElementById("playersRow")

const profileHead = document.getElementById("profileHead")


fetch('https://www.balldontlie.io/api/v1/teams')
.then(response => {
   
    return response.json()
}).then(result => {
    
    divisionSelect.addEventListener("change", function() {
    // console.log("i run")
        let selectedDivision = this.value
        
        
    
        if (selectedDivision == "All") {
            displayDivisions(result.data)
        } else {
            
            let filteredData = result.data.filter(function(team) {
                
                return team.division == selectedDivision
            })
    
            displayDivisions(filteredData)
        }
    
    
    })
})


function displayDivisions(divisionsToDisplay) {
    teamsUL.innerHTML = "" // clear out all teams

    const teamDivisions = divisionsToDisplay.map(function(team) {
        return `<div class="teamGrid">
                    <div class="teamPhoto"><img src="image/${team.id}.gif"></div>
                   <label><b>${team.full_name}</b></label>
                   <p>Conference: ${team.conference}</p>
                   <p>City: ${team.city}</p>
                  
                <div class="bodyButton">
                   <button type="button" class="btn btn-outline-success" onClick="teamProfile('${team.id}')">Roster</button>
                   <a type="button" class="btn btn-outline-success" href="https://www.nba.com/schedule" >Schedule</a>
                 </div>  
                </div>`
    })

    teamsUL.innerHTML = teamDivisions.join("")
}



function teamProfile(id) {
    const filteredPlayers = players.filter(function(player) {
        return player.team_id == id
    })

    displayPlayers(filteredPlayers)
    

}
function displayPlayers(playersToDisplay) {

    profileHead.innerHTML = `
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Pos</th>
        <th scope="col">Height</th>
        <th scope="col">Experience</th>
        <th scope="col">School</th>
      </tr>
    
      
    ` // clear out all teams 
    playersRow.innerHTML = ""
    const playerProfiles = playersToDisplay.map(function(player) {
        
        playersRow.insertAdjacentHTML("beforeend", `
        <tr>
        
        <td>${player.number}</td>
        <td>${player.name}</td>
        <td>${player.pos}</td>
        <td>${player.height}</td>
        <td>${player.exp}</td>
        <td>${player.school}</td>
        
        </tr> `)
    })
}

    





