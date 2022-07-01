document.addEventListener("DOMContentLoaded", () =>{
    const submitButton = document.getElementById("submitBtn")
    const select = document.getElementById("select")
    submitButton.addEventListener("click", ()=>{
        if (select.value == "Flatiron Campus"){
            console.log("SUCCESS!!")
        }
    }
    )



})


function getProgrammingJoke(){
    fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit')
    .then(resp=>{
        console.log(resp.status)
        console.log(resp.ok)
        return resp.json()
    })
}


