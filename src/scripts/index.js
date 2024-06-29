
import { getFavoritePokemonArray, favoritePokemon } from "./favorite.js";
import { getAllPokemon, getPokemonByName } from "./requests.js";

export { appendSearchedCard }

const baseUrl = "https://pokeapi.co/api/v2/pokemon/"

function createPokemonCard(object) {
    let card = document.createElement("li")
    card.classList.add("poke__list--card")

    let name = document.createElement("p")
    name.classList.add("card__name")
    name.innerText = object.name

    let img = document.createElement("img")
    const pokeId = object.url.slice(34, -1)
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
    const pokeImg = img.src
    img.addEventListener("click", () => {
        if (img.src == pokeImg) {
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeId}.png`
        } else {
            img.src = pokeImg
        }
    })

    let favButton = document.createElement("button")
    favButton.classList.add("favButton")
    favButton.id = pokeId
    favButton.addEventListener("click", () => {
        favoritePokemon(favButton)
    })

    let i = document.createElement("i")
    let favorite = getFavoritePokemonArray()
    if (favorite.includes(favButton.id)) {
        i.classList.add("fa-solid", "fa-star")
    } else {
        i.classList.add("fa-regular", "fa-star")
    }

    favButton.append(i)

    let id = document.createElement("span")
    id.innerText = pokeId

    card.append(img, id, name, favButton)
    return card
}

function appendCard(object, htmlReference) {
    let card = createPokemonCard(object)
    htmlReference.append(card)
}

function createSearchedCard(object) {
    let card = document.createElement("li")
    card.classList.add("poke__list--card")

    let name = document.createElement("p")
    name.classList.add("card__name")
    name.innerText = object.name

    let id = document.createElement("span")
    id.innerText = object.id

    let img = document.createElement("img")
    const sprites = object.sprites
    const frontSprite = sprites.front_default
    const backSprite = sprites.back_default
    img.src = frontSprite
    img.addEventListener("click", () => {
        if (img.src == frontSprite) {
            img.src = backSprite
        } else if (img.src == backSprite) {
            img.src = frontSprite
        }
    })
    let favButton = document.createElement("button")
    favButton.classList.add("favButton")
    favButton.id = object.id
    favButton.addEventListener("click", () => {
        favoritePokemon(favButton)
    })

    let i = document.createElement("i")
    let favorite = getFavoritePokemonArray()
    if (favorite.includes(favButton.id)) {
        i.classList.add("fa-solid", "fa-star")
    } else {
        i.classList.add("fa-regular", "fa-star")
    }

    favButton.append(i)
    card.append(img, id, name, favButton)

    return card
}


function appendSearchedCard(object, htmlReference) {
    let searchedCard = createSearchedCard(object)
    htmlReference.append(searchedCard)
}

async function searchPokemon(string) {
    const pokeList = document.querySelector(".poke__list")
    pokeList.innerHTML = '<li class="loading">Carregando...</li>'
    const searchedPokemon = await getPokemonByName(string)
    pokeList.innerHTML = ""
    appendSearchedCard(searchedPokemon, pokeList)
    const navButtonsContainer = document.querySelector(".navButtons__container")
    navButtonsContainer.classList.add("hidden")
}

async function searchEvent() {
    const searchBtn = document.querySelector(".search__button")
    const input = document.querySelector(".search__input")
    const navButtonsContainer = document.querySelector(".navButtons__container")
    searchBtn.addEventListener("click", (event) => {
        event.preventDefault()
        let searchParameter = input.value.toLowerCase()
        if (searchParameter == "") {
            listAllPokemon(baseUrl)
            navButtonsContainer.classList.remove("hidden")
        } else {
            searchPokemon(searchParameter)
        }
    })
}
searchEvent()

async function listAllPokemon(url) {
    const apiResponse = await getAllPokemon(url)
    let pokeArray = apiResponse.results

    const previousButton = document.querySelector(".previous")
    if(apiResponse.previous == null){
        previousButton.classList.add("hidden")
    }else if(apiResponse.previous !== null){
        previousButton.classList.remove("hidden")
    }

    const nextButton = document.querySelector(".next")
    if(apiResponse.next == null){
        nextButton.classList.add("hidden")
    }else if(apiResponse.next !== null){
        nextButton.classList.remove("hidden")
    }

    const pokeList = document.querySelector(".poke__list")
    pokeList.innerText = ''
    pokeArray.forEach(element => {
        appendCard(element, pokeList)
    });
}


async function callNextPokemon() {
    const currentCall = JSON.parse(localStorage.getItem("@PokeApi:request"))
    await listAllPokemon(currentCall.next)
}

async function callPreviousPokemon() {
    const currentCall = JSON.parse(localStorage.getItem("@PokeApi:request"))
    await listAllPokemon(currentCall.previous)
}

function navigatePokemon() {
    const previousButton = document.querySelector(".previous")
    const nextButton = document.querySelector(".next")

    let storage = JSON.parse(localStorage.getItem("@PokeApi:request"))
    if(storage.previous == null){
        previousButton.classList.add("hidden")
    }else{
        previousButton.classList.remove("hidden")
    }

    previousButton.addEventListener("click", () => {
        callPreviousPokemon()
    })

    nextButton.addEventListener("click", () => {
        callNextPokemon()
    })
}

const homeButton = document.querySelector("#home")
homeButton.addEventListener("click", () => {
    const navButtonsContainer = document.querySelector(".navButtons__container")
    listAllPokemon(baseUrl)
    navButtonsContainer.classList.remove("hidden")
})

listAllPokemon(baseUrl)

navigatePokemon()