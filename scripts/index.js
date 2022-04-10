let btnPerros = document.getElementById('btnCategoria1')
let btnGatos = document.getElementById('btnCategoria2')
let listarCard = document.getElementById('listarCard')
let infoModal = document.getElementById('infoModal')
let loaderContainer = document.getElementById('loaderContainer')
let introModal = document.getElementById('introModal')
let btnIntroModal = document.getElementById('btnIntroModal')



document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loaderContainer.classList.add('hidden')

    btnIntroModal.click()
  }, 2500)
})


btnPerros.addEventListener('click', () => {
  renderMascotas('perros')
})

btnGatos.addEventListener('click', () => {
  renderMascotas('gatos')
})

const renderMascotas = async (mascota) => {
  const { data:pets } = await axios.get(`${API_HOST}/${mascota}?_expand=usuario`)

  if (mascota === 'perros') {
    btnPerros.classList.add('active')
    btnGatos.classList.remove('active')
  } else {
    btnGatos.classList.add('active')
    btnPerros.classList.remove('active')
  }

  listarCard.innerHTML = ''
  pets.forEach(elemento => {
    const { id, imagen, nombre, raza } = elemento
    listarCard.innerHTML += `
      <div class="col-6">
        <div class="card cursor-pointer" type="button" data-bs-toggle="modal" data-bs-target="#containerModal" onclick="renderModal('${id},${mascota}')">
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

const renderModal = async(params) => {
  const [mascotaId, mascota] = params.split(',')
  infoModal.innerHTML = `
    <div class="w-full h-full flex items-center justify-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `
  const { data:mascotaDetalle } = await axios.get(`${API_HOST}/${mascota}/${mascotaId}?_expand=usuario`)
  const {id, imagen, nombre, raza, edad, personalidad, descripcion, usuario} = mascotaDetalle
  const [p1, p2, p3] = personalidad

  infoModal.innerHTML = `
    <div class="modal-header">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      <img src="${imagen}" class="card-img-top w-52" alt="...">
    </div>

    <div class="modal-body">
      <p>${nombre}</p>
      <p>${raza}</p>
      <p>${edad}</p>

      <p>${p1}</p>
      <p>${p2}</p>
      <p>${p3}</p>

      <button type="button" id="favoritos" onclick="guardarFavorito('${id},${mascota}')"></button>

      <h1>Historia de ${nombre}</h1>
      <p>${descripcion}</p>

      <img src="${usuario.picture}" class="card-img-top w-52" alt=${usuario.name.first}>
      <p>${usuario.name.first} ${usuario.name.last}</p>

      <button type="button" id="contacto" onclick="guardarUsuario(${usuario.id})">Contactar</button>
    </div>
    <div class="modal-footer">
    </div>
  `
  renderFavoritoEstado(mascotaId, mascota)
}


const guardarUsuario = (id) => {
  console.log(id)
  localStorage.setItem('Usuario', id)

  window.location.href = 'chat.html'
}

const guardarFavorito = (params) => {
  const [mascotaId, mascota] = params.split(',')
  const id = parseInt(mascotaId)
  const favoritos = localStorage.getItem(`Favorito-${mascota}`)
  if (!favoritos) {
    localStorage.setItem(`Favorito-${mascota}`, JSON.stringify([id]))
  } else {
    const favoritosArray = JSON.parse(favoritos)
    if (!favoritosArray.includes(id)) {
      const nuevoArray = [...favoritosArray, id]
      localStorage.setItem(`Favorito-${mascota}`, JSON.stringify(nuevoArray))
    } else {
      const nuevoArray = favoritosArray.filter(fav => fav !== id)
      localStorage.setItem(`Favorito-${mascota}`, JSON.stringify(nuevoArray))
    }
  }

  renderFavoritoEstado(id, mascota)
}

const renderFavoritoEstado = (id, mascota) => {
  const btnFavorito = document.getElementById('favoritos')
  const btnActivo = 'fav' //Template literal HTML Icon
  const btnInactivo = 'fav-inactive'
  btnFavorito.innerHTML =  validarFavorito(id, mascota) ? btnActivo : btnInactivo
}

const validarFavorito = (id, mascota) => {
  const favoritos = localStorage.getItem(`Favorito-${mascota}`)
  if (!favoritos) {
    return false
  } else {
    const favoritosArray = JSON.parse(favoritos)
    return favoritosArray.includes(id)
  }

}

renderMascotas('perros')