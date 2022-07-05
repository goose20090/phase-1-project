document.addEventListener("DOMContentLoaded", () =>{
    const submitButton = document.getElementById("submitBtn");
    const select = document.getElementById("select");
    const randomJoke= document.getElementById("random");
    const clearList = document.getElementById("clear");
    let container = document.getElementById("main-joke-container");
    const form = document.getElementById("jokeInputForm");
    const singleJokeBox= document.getElementById("single-joke-checkbox")

    singleJokeBox.addEventListener('change', ()=>{
        changeToSingleForm()
    })

    clearList.addEventListener("click", ()=>{
        container.innerHTML = '';
    })

    randomJoke.addEventListener('click', ()=>{
        getRandomJoke()
    })

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
    })

    form.addEventListener("submit", handleSubmit)

})

function changeToSingleForm(){
    let form = document.getElementById("jokeInputForm");
    form.innerHTML = '';
    let jokeInputLabel = document.createElement("label");
    let jokeInput = document.createElement("input");
    let jokeSubmit = document.createElement("input");
    let doubleJokeBox = document.createElement("input");
    
    jokeInputLabel.innerText = "Put in your one-liner!"
    jokeInput.id = "single-joke-input"
    jokeSubmit.setAttribute("type", "submit")
    jokeSubmit.id = "submitBtn"
    doubleJokeBox.setAttribute("type", "checkbox")
    doubleJokeBox.id = ("double-joke-checkbox")

    form.append(jokeInputLabel, jokeInput, jokeSubmit, doubleJokeBox)
}




function handleSubmit(e){
    e.preventDefault();
    if (document.getElementById("single-joke-input")!== null){
        let oneLiner = document.getElementById("single-joke-input")
        let jokeObj = {
            
                category: "userSubmitted",
                type: "single",
                joke: oneLiner.value,
                safe: true,
                lang: "en",
        }
        postNewJoke(jokeObj);
        oneLiner.value = ""
    }
    else {
        let buildUp = document.getElementById("build-up");
        let punchline = document.getElementById("punchline");
        let jokeObj = {
            category: "userSubmitted",
            type: "twopart",
            setup: buildUp.value,
            delivery: punchline.value,
            safe: true,
            lang: "en",

        }
        postNewJoke(jokeObj)
        buildUp.value = ''
        punchline.value = ''}

}

function postNewJoke(jokeObj){
    fetch('http://localhost:3000/jokes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObj)
    })
    .then(resp => resp.json())
    .then(joke => appendJoke(joke))
}

// ALLOW USERS TO TOGGLE WHETHER THEIR JOKE IS A SINGLE LINE OR A SET UP AND PUNCH LINE STYLE JOKE

//- add event listener

//- change inner html of form

//- add event listener to new form that makes process reversible

//STRETCH-  USE ARRAY METHOD TO PREVENT REPEAT JOKES

//STRETCH- HAVE AN ALERT MESSAGE THAT PLAYS WHEN A MAXIMUM NUMBER OF SPOOKY JOKES HAS BEEN PUT ON THE DOM

//STRETCH- GIVE OPPORTUNITY TO LIKE JOKES AND ADD THEM TO A FAVOURITE LIST

function getProgrammingJoke(){
    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit')
    .then(resp=>{
        return resp.json()
    })
    .then(joke => appendJoke(joke))

}

function getChristmasJoke(){
    fetch('https://v2.jokeapi.dev/joke/Christmas?blacklistFlags=nsfw,racist,sexist,explicit')
    .then(resp=>{
        return resp.json()
    })
    .then(joke => appendJoke(joke))
}

function getSpookyJoke(){
    fetch('https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=nsfw,racist,sexist,explicit')
    .then(resp=>{
        return resp.json()
    })
    .then(joke => appendJoke(joke))
}

function getRandomJoke(){
    fetch('https://v2.jokeapi.dev/joke/Pun?safe-mode')
    .then(resp=>{
        return resp.json()
    })
    .then(joke => appendJoke(joke))

}

function appendJoke(joke){
        if(joke.joke !== undefined){
        let jokeP = document.createElement("p")
        jokeP.textContent = joke.joke
        let container = document.getElementById("main-joke-container")
        container.append(jokeP)
    }

        else{
            let jokeP = document.createElement("p")
        jokeP.textContent = `${joke.setup} ${joke.delivery}`
        let container = document.getElementById("main-joke-container")
        container.append(jokeP)
    }
}