import { getPokemonByName } from "./requests.js"
import { appendSearchedCard } from "./index.js"

export { favoritePokemon, getFavoritePokemonArray, listFavoritePokemon }

function getFavoritePokemonArray() {
    return JSON.parse(localStorage.getItem("@PokeApi:favorites")) || []
}

function favoritePokemon(button) {
    const favoriteArray = getFavoritePokemonArray()
    if (favoriteArray.includes(button.id)) {
        let pokemonIndex = favoriteArray.indexOf(button.id)
        favoriteArray.splice(pokemonIndex, 1)
        localStorage.setItem("@PokeApi:favorites", JSON.stringify(favoriteArray))
        button.innerHTML = '<i class= "fa-star fa-regular"></i>'
    } else {
        favoriteArray.push(button.id)
        localStorage.setItem("@PokeApi:favorites", JSON.stringify(favoriteArray))
        button.innerHTML = '<i class= "fa-star fa-solid"></i>'
    }
}

async function listFavoritePokemon() {
    let favoriteArray = getFavoritePokemonArray()
    const pokeList = document.querySelector(".poke__list")
    pokeList.innerText = ""
    
    favoriteArray.forEach(async (element) => {
        const favoritePokemon = await getPokemonByName(element)
        appendSearchedCard(favoritePokemon, pokeList)
    })

    const navButtonsContainer = document.querySelector(".navButtons__container")
    navButtonsContainer.classList.add("hidden")
}
function listFavoritesEvent(){
    const favButton = document.querySelector(".favList__button")
    favButton.addEventListener("click", (event) => {
        event.preventDefault()
        listFavoritePokemon()
    })
}
listFavoritesEvent()