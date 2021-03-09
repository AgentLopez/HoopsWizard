const playerStatsBtn = document.getElementById("playerStatsBtn")
const homeBtn = document.getElementById("homeBtn")
const gameStatsBtn = document.getElementById("gameStatsBtn")
const teamStatsBtn = document.getElementById("teamStatsBtn")
const searchBy = document.getElementById("searchBy")

function fetchGames(onGamesLoad) {

    let request = new XMLHttpRequest()

    request.addEventListener("load", function () {

        let games = JSON.parse(this.responseText)
        onGamesLoad(games)
    })

    request.open('GET', 'https://www.balldontlie.io/api/v1/games')
    request.send()
}


function displayGamesOnConsole(games) {
    console.log(games)
}

function displayGames(games) {
    
    gamesData.innerHTML = ""

    const gameArray = games.map((data) => {
        return `<li>
                    <b>${data.id}</b>
                    <p>${data.date}</p>
                    <p>$${data.home_team_score}</p>
                    <p>${data.season}</p>
                </li>
        `
    })

    gamesData.innerHTML = gameArray.join("")
}

fetchGames(function(games) {
    displayGames(games)
}) 




