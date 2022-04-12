let listarPerros = document.getElementById('listarPerros')
let listarGatos = document.getElementById('listarGatos')

const vistaFavoritos = async() => {
  const { data:perros } = await axios.get(`${API_HOST}/perros`)
  const { data:gatos } = await axios.get(`${API_HOST}/gatos`)

  const favoritosPerros = localStorage.getItem('Favorito-perros')
  const favoritosGatos = localStorage.getItem('Favorito-gatos')

  if (favoritosPerros) {
    const arrayFavoritosPerros = JSON.parse(favoritosPerros)
    const perrosFavoritosFiltrados = perros.filter(perro => {
      return arrayFavoritosPerros.includes(perro.id)
    })

    perrosFavoritosFiltrados.forEach(perro =>  {
      const { imagen, nombre, raza } = perro
      listarPerros.innerHTML += `
        <div
          class="
            card relative
            w-full h-64
            rounded-2xl
            border-0
          "
        >
          <img
            src="${imagen}"
            class="card w-full h-full object-cover rounded-2xl border-0"
            alt=${nombre}
          >
          <div
            class="
              absolute top-0
              flex flex-col
              w-full h-full
              justify-end
              p-3 text-white
              bg-gradient-to-t from-black
              rounded-2xl border-0
              truncate
            "
          >
            <h5 class="text-sm font-bold">${nombre}</h5>
            <p class="text-sm font-normal">${raza}</p>
          </div>
        </div>
      `
    })
  }

  if (favoritosGatos) {
    const arrayFavoritosGatos = JSON.parse(favoritosGatos)
    const gatosFavoritosFiltrados = gatos.filter(gato => {
      return arrayFavoritosGatos.includes(gato.id)
    })

    gatosFavoritosFiltrados.forEach(gato =>  {
      const { imagen, nombre, raza } = gato
      listarGatos.innerHTML += `
        <div
          class="
            card relative
            w-full h-64
            rounded-2xl
            border-0
          "
        >
          <img
            src="${imagen}"
            class="card w-full h-full object-cover rounded-2xl border-0"
            alt=${nombre}
          >
          <div
            class="
              absolute top-0
              flex flex-col
              w-full h-full
              justify-end
              p-3 text-white
              bg-gradient-to-t from-black
              rounded-2xl border-0
              truncate
            "
          >
            <h5 class="text-sm font-bold">${nombre}</h5>
            <p class="text-sm font-normal">${raza}</p>
          </div>
        </div>
      `
    })
  }
}

vistaFavoritos()
