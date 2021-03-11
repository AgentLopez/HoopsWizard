const startDateSearch = document.getElementById("startDateSearch")
const endDateSearch = document.getElementById("endDateSearch")
const submitDateSearch = document.getElementById("submitDateSearch")
const gameTodayCheck = document.getElementById("gameTodayCheck")
const gamesToday = document.getElementById("gamesToday")
const upcomingGames = document.getElementById("upcomingGames")
const searchResults = document.getElementById("searchResults")


var d1 = new Date().toLocaleString()
var tomorrow = new Date(d1)
var nextWeek = new Date(d1)
tomorrow.setDate(tomorrow.getDate() + 1)
nextWeek.setDate(nextWeek.getDate() + 7)
var tday = d1.slice(0, -12)
var tmor = tomorrow.toLocaleString().slice(0, -12)
var nwee = nextWeek.toLocaleString().slice(0, -12)


window.addEventListener('load', function () {
    getCurrentGames()
    inervalID = window.setInterval(function () {
        getCurrentGames()
    }, 120000)
})

function getCurrentGames() {
    fetch(`https://www.balldontlie.io/api/v1/games?start_date=${tday}&end_date=${tday}`)
    .then((response) => {
        return response.json()
    })
    .then((games) => {
        if (games.data.length == 0) {
            console.log('No Games Today')
            gameTodayCheck.innerHTML = `<h2>No Games Today</h2>`
        }
        else {
            displayGames(games.data)
        }

    })
}


fetch(`https://www.balldontlie.io/api/v1/games?start_date=${tmor}&end_date=${tmor}`)
    .then((response) => {
        return response.json()
    })
    .then((games) => {
        if (games.data.length == 0) {
            console.log('No Games Tomorrow')
            upcomingGames.innerHTML = `<h2>No Games Tomorrow</h2>`
        }
        else {
            displayComingGames(games.data)
        }

    })

function displayGames(games) {
    gamesToday.innerHTML = ""
    let todaygames = games.map(function (tgame) {
        return `
        <div class="teamGrid currentGameBox"><img src="image/${tgame.home_team.id}.gif" height='90px' width='auto'><br><br><p>${tgame.home_team_score}</p> <b>${tgame.home_team.name}</b><br> vs <br><b>${tgame.visitor_team.name}</b> <p>${tgame.visitor_team_score}</p><br><img src="image/${tgame.visitor_team.id}.gif" height='90px' width='auto'></div>
        `
    })
    gamesToday.innerHTML = todaygames.join("")
}

function displayComingGames(games) {
    let comingGames = games.map(function (tgame) {
        let gdate = tgame.date.slice(5, -14)
        return `
        <li class="bullets"><b>${tgame.home_team.name}</b> vs <b>${tgame.visitor_team.name}</b></li>
        `
    })
    upcomingGames.innerHTML = comingGames.join("")
}

function searchGames(games) {
    let searchGames = games.map(function (tgame) {

        return `
        <li class="bullets">${tgame.home_team_score} ${tgame.home_team.name} vs ${tgame.visitor_team.name} ${tgame.visitor_team_score}</li>
        `
    })
    searchResults.innerHTML = searchGames.join("")
}

