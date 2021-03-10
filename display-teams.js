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








// function teamProfile(id) {
//     // fetch(`https://www.balldontlie.io/api/v1/players/`, {
//     //     }).then((response) => {
//     //         console.log(id)
//     //         return response.json()
//     //     }).then(result => {
//     //         console.log(result)
//             let teamPlayers = player_data.filter(function(player) {
               
//                 return player.team.id == 14
//             })
//           console.log(teamPlayers) 
//         // })
//         // .then(teamPlayers => {
//         //     let profileItems = teamPlayers.map(function(player) { 
//         //         return      `   <li>
//         //                         <label>${player.first_name}, ${player.last_name}</label>
//         //                         <p>Position: ${player.position}</p>
//         //                         <p>Height: ${player.height_feet}'${player.height_inches}</p>
                               
                                
//         //                         </li>`
//         //                     })                   
//         // teamsUL.innerHTML = profileItems.join("")
//         //                 })
            
// }

