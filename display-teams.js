// console.log("this is running")
const teamsUL = document.getElementById("teamsUL")

const divisionSelect = document.getElementById("divisionSelect")


const profileUL = document.getElementById("profileUL")



fetch('https://www.balldontlie.io/api/v1/teams')
.then(response => {
    console.log(response)
    return response.json()
}).then(result => {
    console.log(result)
    divisionSelect.addEventListener("change", function() {
    // console.log("i run")
        let selectedDivision = this.value
        console.log(selectedDivision)
        
    
        if (selectedDivision == "All") {
            displayDivisions(result.data)
        } else {
            console.log(result)
            let filteredData = result.data.filter(function(team) {
                console.log(team.division)
                return team.division == selectedDivision
            })
    
            displayDivisions(filteredData)
        }
    
    
    })
})


function displayDivisions(divisionsToDisplay) {
    console.log(divisionsToDisplay)
    teamsUL.innerHTML = "" // clear out all teams

    const teamDivisions = divisionsToDisplay.map(function(team) {
        return `<li>
                   <label><b>${team.full_name}</b></label>
                   <p>Conference: ${team.conference}</p>
                   <p>City: ${team.city}</p>

                   <button onClick="teamProfile('${team.id}')">Profile</button>

                   <button onClick="teamStats">Stats</button>
                   <button onClick="teamSchedule">Schedule</button>
                   
                </li>`
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

    teamsUL.innerHTML = "" // clear out all teams 

    const playerProfiles = playersToDisplay.map(function(player) {
        return `<li>
                   <label><b>${player.name}</b></label>
                   <p># ${player.number}</p>
                   <p>Position: ${player.pos}</p>
                   <p>Height: ${player.height}</p>
                   <p>Exp: ${player.exp}</p>
                   <p>School: ${player.school}</p>
                </li>`
    })

    teamsUL.innerHTML = playerProfiles.join("")
}

    





