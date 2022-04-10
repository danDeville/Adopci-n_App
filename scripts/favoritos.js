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
        <div class="col-6">
          <div class="card cursor-pointer">
            <img src="${imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">${raza}</p>
            </div>
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
        <div class="col-6">
          <div class="card cursor-pointer">
            <img src="${imagen}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">${raza}</p>
            </div>
          </div>
        </div>
      `
    })
  }
}

vistaFavoritos()