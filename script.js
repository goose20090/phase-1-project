document.addEventListener("DOMContentLoaded", () =>{
    const submitButton = document.getElementById("submitBtn");
    const select = document.getElementById("select");
    const randomJoke= document.getElementById("random");
    const clearList = document.getElementById("clear");
    const container = document.getElementById("main-joke-container");
    const form = document.getElementById("jokeInputForm");
    const punchLine = document.getElementById("punchline");
    const punchLineLabel = document.getElementById("punchline-label");
    const buildUpLabel = document.getElementById("build-up-label")
    const checkbox= document.getElementById("checkbox")
    const buildUp = document.getElementById("build-up")
    

    checkbox.addEventListener('change', ()=>{

        if (document.getElementById("single-joke-input") == null){
            changeToSingleForm()
        }
        else if (document.getElementById("build-up")== null){
            changetoDoubleForm()
        }
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
        else if (select.value == "userSubmitted"){
            getUserJoke()
        }
    })

    form.addEventListener("submit", handleSubmit)


    function changeToSingleForm(){

        punchLine.disabled = true;
        punchLineLabel.textContent = ""
        buildUp.setAttribute("size", 30)
        buildUpLabel.textContent = "One Liner..."
        document.getElementById("build-up").id = "single-joke-input"
    }

    function changetoDoubleForm(){
        punchLine.disabled = false;
        punchLineLabel.textContent = "Punchline!"
        buildUpLabel.textContent = "Set up..."
        buildUp.setAttribute("size", 20)
        document.getElementById("single-joke-input").id = "build-up"

    }
    
    function handleSubmit(e){
        e.preventDefault();
    
        if(document.getElementById("user-submit-select") == null){
            let userSubmitSelect = document.createElement("option")
            userSubmitSelect.setAttribute("value", "userSubmitted")
            userSubmitSelect.id = "user-submit-select"
            userSubmitSelect.innerText= "I want my own material!"
            select.append(userSubmitSelect)
            
        }
    
    
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
            let jokeObj = {
                category: "userSubmitted",
                type: "twopart",
                setup: buildUp.value,
                delivery: punchLine.value,
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
    
    
    //STRETCH-  USE ARRAY METHOD TO PREVENT REPEAT JOKES- PARTIALLY DONE (JOKEs do not repeat. Would like to have a message that caps the number of spooky jokes)
    
    //STRETCH- HAVE AN ALERT MESSAGE THAT PLAYS WHEN A MAXIMUM NUMBER OF JOKES HAS BEEN PUT ON THE DOM
    
    //STRETCH- GIVE OPPORTUNITY TO LIKE JOKES AND ADD THEM TO A FAVOURITE LIST- DONE
    
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

    function getUserJoke(){
        fetch('http://localhost:3000/jokes')
        .then(resp=> {
            return resp.json()
        })
        .then(function(jokes){
            let joke = jokes[Math.floor(Math.random()*jokes.length)]
            appendJoke(joke)
        })

    }

    function checkJokeExistance(joke, jokeP){
        console.log(joke)
        let jokes = document.querySelectorAll('p')
        let category = joke.category
        let i = 0
        for (existingP of jokes){
            if (existingP.innerText === jokeP.innerText){
                i++;
                if (i> 1){
                    jokeP.remove()
                    if (category == "Spooky"){
                        let spookyJokes = document.getElementsByClassName("spooky")
                        if(spookyJokes.length === 7){
                            alert("we're out of spooky jokes!")
                            
                        }
                        else getSpookyJoke()
                    }
                    if (category == "userSubmitted")
                    {
                        console.log(getNoOfUserJokes())
                        
                    }
                }
                    
            }
        }
    }
        
function getNoOfUserJokes(){
    fetch('http://localhost:3000/jokes')
    .then(resp=> {
    return resp.json()
    })
    .then(function(jokes){
    return jokes.length
    })
}
    
    function appendJoke(joke){
        let emptyHeart = document.createElement("span")
        emptyHeart.className = "empty-heart"
        emptyHeart.innerHTML = "&#9825;"

        let cross = document.createElement("span")
        cross.className = "cross"
        cross.innerHTML = "&#215;"


            if(joke.joke !== undefined){
            let jokeP = document.createElement("p")
            addJokeClass(joke, jokeP)
            jokeP.innerHTML = joke.joke
            let container = document.getElementById("main-joke-container")
            container.append(jokeP)
            jokeP.append(emptyHeart, cross)
            addHeartListener(emptyHeart)
            addCrossListener(cross)
            checkJokeExistance(joke,jokeP)
            
        }
    
            else{
                let jokeP = document.createElement("p")
                addJokeClass(joke,jokeP)
                jokeP.innerHTML = `${joke.setup} ${joke.delivery}`
                let container = document.getElementById("main-joke-container")
                container.append(jokeP)
                jokeP.append(emptyHeart, cross)
                addHeartListener(emptyHeart)
                addCrossListener(cross)
                checkJokeExistance(joke,jokeP)
        }
    }

function addHeartListener(heart){
    heart.addEventListener('click', ()=>{
        if (document.getElementById("loved-list-headline")!== null){
            let h2 = document.createElement("h2")
            h2.textContent = "My Favourite Jokes"

        }
        handleHeartClick(heart)

    })
}

function addCrossListener(cross){
    cross.addEventListener('click', ()=>{
    let fullJoke = cross.parentElement
    fullJoke.remove()
}

    )}

function handleHeartClick(heart){
        heart.innerHTML = "&#9829;";
        heart.className = "full-heart";
        let fullJoke = heart.parentElement
        let lovedList= document.getElementById("loved-list")
        fullJoke.remove
        lovedList.append(fullJoke)
}


})

function addJokeClass(joke, jokeP){
    if (joke.category== "Programming"){
        jokeP.className = "programming"
        console.log("PROGRAMMING JOKE RESPONSE",jokeP)
    }
    else if (joke.category == "Christmas"){
        jokeP.className = "christmas"
        console.log(jokeP)
    }
    else if (joke.category == "Spooky"){
        jokeP.className = "spooky"
    }
    else if (joke.category == "userSubmitted"){
        jokeP.className = "user-submitted"
    }
    else if (joke.category == "Pun"){
        jokeP.className = "random"

    }
}