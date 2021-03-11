
const gamesData = document.getElementById('gamesData')

function fetchGames(onGamesLoad) {

    let request = new XMLHttpRequest()

    request.addEventListener("load", function () {

        let games = JSON.parse(this.responseText)
        onGamesLoad(games)
    })

    request.open('GET', 'https://www.balldontlie.io/api/v1/teams')
    request.send()
}


function displayGamesOnConsole(games) {
    console.log(games)
}

function displayGames(games) {
    
    gamesData.innerHTML = ""

    const gameArray = games.data.map((data) => {
        return `<li>
                    <b>${data.id}</b>
                    <p>${data.city}</p>
                    <p>${data.full_name}</p>
                </li>
        `
    })

    gamesData.innerHTML = gameArray.join("")
}

fetchGames(function(games) {
    displayGames(games)})
    