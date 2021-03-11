// http://basketball-data.surge.sh

const getAllTeams = document.getElementById("getAllTeams")

getAllTeams.addEventListener('click', () => {
    fetch('https://www.balldontlie.io/api/v1/teams')
    .then ((response) => {
        return response.json()
    })
    .then ((teams) => {
        console.log(teams.data)
    })
})

const startDateSearch = document.getElementById("startDateSearch")
const endDateSearch = document.getElementById("endDateSearch")
const submitDateSearch = document.getElementById("submitDateSearch")

submitDateSearch.addEventListener('click', function() {
    let start = startDateSearch.value
    let end = endDateSearch.value

    fetch(`https://www.balldontlie.io/api/v1/games?start_date=${start}&end_date=${end}`)
    .then ((response) => {
        return response.json()
    })
    .then ((games) => {
        console.log(games.data)
    })
})

