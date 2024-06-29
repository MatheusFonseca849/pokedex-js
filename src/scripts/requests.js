const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
async function getAllPokemon(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => { return response.json() })
        .then((response) => { return response })
    localStorage.setItem("@PokeApi:request", JSON.stringify(response))
    return response
}

async function getPokemonByName(pokemonName) {
    const response = await fetch(baseUrl + pokemonName, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => { return response.json() })
        .then((response) => { return response })

    return response
}

export { getAllPokemon, getPokemonByName }