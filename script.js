document.addEventListener("DOMContentLoaded", () =>{
    const submitButton = document.getElementById("submitBtn");
    const select = document.getElementById("select");
    const randomJoke= document.getElementById("random");
    const clearList = document.getElementById("clear");
    let container = document.getElementById("main-joke-container")
    const form = document.getElementById("jokeInputForm")

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


function handleSubmit(e){
    e.preventDefault();
    let buildUp = document.getElementById("build-up");
    let punchline = document.getElementById("punchline");
    let jokeObj = {
        category: "userSubmitted",
        type: "twopart",
        setup: setUp.value,
        delivery: punchline.value,
        safe: true,
        lang: "en",

    }

    console.log (jokeObj)

}


//WRITE JOKE GETTER AS A CALLBACK AND PASS INTO ALL JOKE GETTERS TO MAKE CODE DRIER- DONE

//NEXT SET UP JSON SERVER AND USE THAT INSTEAD OF API

// GET SUBMIT OWN JOKE FORM WORKING

// GET RANDOM JOKE BUTTON WORKING- DONE

//STRETCH-  USE ARRAY METHOD TO PREVENT REPEAT JOKES

//STRETCH- HAVE AN ALERT MESSAGE THAT PLAYS WHEN A MAXIMUM NUMBER OF SPOOKY JOKES HAS BEEN PUT ON THE DOM

// Have the Opportunity to like jokes and put them on a favourite list

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
    fetch('https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,racist,sexist,explicit')
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