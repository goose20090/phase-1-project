document.addEventListener("DOMContentLoaded", () =>{
    const submitButton = document.getElementById("submitBtn")
    const ScenarioSelector = document.querySelector(".scenario-selector")
    submitButton.addEventListener("click", ()=>{
        if (ScenarioSelector.value == "Flatiron Campus"){
            getProgrammingJoke(){

            }
        }
    })



})


function getProgrammingJoke(){
    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit')
    .then(resp=>{
        console.log(resp.status)
        console.log(resp.ok)
        return resp.json()
    })
}


