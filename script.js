document.addEventListener("DOMContentLoaded", () =>{
    const submitButton = document.getElementById("submitBtn")
    const select = document.getElementById("select")
    submitButton.addEventListener("click", ()=>{
        if (select.value == "programming"){
            getProgrammingJoke()
        }
        else if (select.value == "christmas"){
            getChristmasJoke()
        }
        else if (select.value == "spooky"){
            getSpookyJoke()
        }
    }
    )
})

//STRETCH USE ARRAY METHOD TO PREVENT REPEAT JOKES


function getProgrammingJoke(){
    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit')
    .then(resp=>{
        console.log(resp.status)
        console.log(resp.ok)
        return resp.json()
    })
    .then(joke => {
        if(joke.joke !== undefined){
        console.log(joke)
        let jokeP = document.createElement("p")
        jokeP.textContent = joke.joke
        let container = document.getElementById("main-joke-container")
        container.append(jokeP)}

        else{
            let jokeP = document.createElement("p")
        jokeP.textContent = `${joke.setup} ${joke.delivery}`
        let container = document.getElementById("main-joke-container")
        container.append(jokeP)
        }

    })

}

function getChristmasJoke(){
    fetch('https://v2.jokeapi.dev/joke/Christmas?blacklistFlags=nsfw,racist,sexist,explicit')
    .then(resp=>{
        console.log(resp.status)
        console.log(resp.ok)
        return resp.json()
    })
    .then(joke => {
        console.log(joke)
        let jokeP = document.createElement("p")
        jokeP.textContent = `${joke.setup} ${joke.delivery}`
        let container = document.getElementById("main-joke-container")
        container.append(jokeP)

    })
}

function getSpookyJoke(){
    fetch('https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=nsfw,racist,sexist,explicit')
    .then(resp=>{
        console.log(resp.status)
        console.log(resp.ok)
        return resp.json()
    })
    .then(joke => {
        if(joke.joke !== undefined){
        console.log(joke)
        let jokeP = document.createElement("p")
        jokeP.textContent = joke.joke
        let container = document.getElementById("main-joke-container")
        container.append(jokeP)}

        else{
            let jokeP = document.createElement("p")
        jokeP.textContent = `${joke.setup} ${joke.delivery}`
        let container = document.getElementById("main-joke-container")
        container.append(jokeP)
        }

    })

}

