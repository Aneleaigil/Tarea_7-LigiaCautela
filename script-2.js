
//llamar a la API con fetch y traer la información de un pokemon, La api trae por defecto 20, aunque tiene mas.//

async function apiPokemon(url) {
    const listaPokemon = await fetch(url)
    return await listaPokemon.json()
  }
  
  
  // sirve para ver la estructura de la api y saber la ruta de las imagenes//
  async function verEstructura() {
      const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/1")
      const datos = await respuesta.json()
      console.log(datos)
    }
    verEstructura()
    
  // Llamar a la API y traer los pokemones con nombre e imagen frontal//
  
  async function detallePokemon() {
    const listaPokemon = await apiPokemon ("https://pokeapi.co/api/v2/pokemon/")
  
    const promesas = listaPokemon.results.map(async (pokemon) => {
      const datos = await apiPokemon(pokemon.url)
      return { nombre: datos.name, imagen: datos.sprites.front_default }
    })
  
    return await Promise.all(promesas)  
  }
  
  
    //capturar errores con try y catch//  
  
    async function mostrarPokemones(){
  try {
    const pokemones = await detallePokemon()
    console.log(pokemones)
  }
  catch (error) {
    console.error("Sorry no se pudo cargar la información de los pokemones", error.message)
  }
    }
  
  mostrarPokemones()
  
  
  
    
  
//....js2----//
// 1. llamar a la API
async function apiPokemon(url) {
  const listaPokemon = await fetch(url)
  return await listaPokemon.json()
}

// 2. ver estructura (opcional, puedes borrarla después)
async function verEstructura() {
  const datos = await apiPokemon("https://pokeapi.co/api/v2/pokemon/1")
  console.log(datos)
}

// 3. traer nombre e imagen
async function detallePokemon() {
  const listaPokemon = await apiPokemon("https://pokeapi.co/api/v2/pokemon/")
  const promesas = listaPokemon.results.map(async (pokemon) => {
    const datos = await apiPokemon(pokemon.url)
    return { nombre: datos.name, imagen: datos.sprites.front_default }
  })
  return await Promise.all(promesas)
}

// 4. mostrar en HTML
async function mostrarPokemones() {
  try {
    const pokemones = await detallePokemon()
    const contenedor = document.getElementById("contenedor")
    pokemones.forEach((pokemon) => {
      const card = document.createElement("div")
      card.className = "card"
     card.style.width = "18rem" 
      card.innerHTML = `
        <img src="${pokemon.imagen}" class="card-img-top" alt="${pokemon.nombre}">
        <div class="card-body">
          <h5 class="card-title">${pokemon.nombre}</h5>
        </div>
      `
      contenedor.appendChild(card)
    })
  } catch (error) {
    console.error("Sorry no se pudo cargar", error.message)
  }
}

mostrarPokemones()  


// 4. mostrar en HTML -  dibujar en front los pokemones en cards con su nombre e imagen.
async function mostrarPokemones() {
  try {
    const pokemones = await detallePokemon()
    const contenedor = document.getElementById("contenedor")
    pokemones.forEach((pokemon) => {
      const card = document.createElement("div")
      card.className = "card"
      card.style.width = "18rem"
      card.innerHTML = `
        <img src="${pokemon.imagen}" class="card-img-top" alt="${pokemon.nombre}">
        <div class="card-body">
          <p class="card-text nombre-pokemon">${pokemon.nombre}</p>
        </div>
      `
      contenedor.appendChild(card)
    })
  } catch (error) {
    console.error("Sorry no se pudo cargar", error.message)
  }
}

mostrarPokemones()