// c. llamar a la API asincrona con async/fetch
async function apiPokemon(url) {
  const listaPokemon = await fetch(url)
  return await listaPokemon.json()
}

// 2. ver estructura (de la api para ubicar la imagen))
async function verEstructura() {
  const datos = await apiPokemon("https://pokeapi.co/api/v2/pokemon/1")
  console.log(datos)
}

// b. traer nombre e imagen de la api con la funcion asincrona con async/await

async function detallePokemon() {
  const listaPokemon = await apiPokemon("https://pokeapi.co/api/v2/pokemon/")
  const promesas = listaPokemon.results.map(async (pokemon) => { // método .map para recorrer el array y bicar cada pokemon.
    const datos = await apiPokemon(pokemon.url) // con la url de cada pokemon traemos su información completa para ubicar el nombre y la imagen.
    return { nombre: datos.name, imagen: datos.sprites.front_default } // traemos la foto frontal de cada pokemon desde .sprites.front_default
  })
  return await Promise.all(promesas)
}

// a y d. mostrar en HTML -  dibujar en front los pokemones en cards con su nombre e imagen y trabajar los errores con try y catch
async function mostrarPokemones() {
  try {
    const pokemones = await detallePokemon()
    const contenedor = document.getElementById("contenedor")
    pokemones.forEach((pokemon) => {
      const card = document.createElement("div")
      card.className = "col"
      card.innerHTML = `
        <div class="card h-100">
          <img src="${pokemon.imagen}" class="card-img-top" alt="${pokemon.nombre}">
          <div class="card-body">
            <p class="card-text nombre-pokemon">${pokemon.nombre}</p>
          </div>
        </div>
      `
      contenedor.appendChild(card)
    })
  } catch (error) {
    console.error("Sorry no se pudo cargar", error.message)
  }
}

mostrarPokemones()