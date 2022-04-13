let btnPerros = document.getElementById('btnCategoria1')
let btnGatos = document.getElementById('btnCategoria2')
let listarCard = document.getElementById('listarCard')
let infoModal = document.getElementById('infoModal')
let loaderContainer = document.getElementById('loaderContainer')
let introModal = document.getElementById('introModal')


// const toggleCerrar = (e) => {
//   localStorage.setItem('Intro', 'true')
//   if(localStorage.getItem('Intro') === 'true'){
//     btnIntroModa.disabled = true
//   } else {
//     btnIntroModa.disabled = false
//   }
// }

// let btnIntroModal = document.getElementById('btnIntroModal')
// btnIntroModal.addEventListener('click', toggleCerrar)


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
      <div
        class="
          card relative
          w-full h-64
          rounded-2xl
          border-0
          cursor-pointer"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#containerModal"
          onclick="renderModal('${id},${mascota}')
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
  const {id, imagen, nombre, raza, edad, personalidad, descripcion, usuario, ubicacion} = mascotaDetalle
  const [p1, p2, p3] = personalidad

  infoModal.innerHTML = `
    <div class="modal-header relative p-0" style="height: 440px">
      <button
        class="
          btn-close
          absolute top-6 left-6
          flex items-center justify-center
          w-11 h-11
          rounded-full
          bg-Black opacity-100
        "
        type="button"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        <img
          src="https://res.cloudinary.com/dz8on44po/image/upload/v1649701544/dogs/Property_1_Variant5_1_s7taqp.svg"
          height="30px"
        >
      </button>
      <img
        class="card-img-top w-full h-full object-cover border-0"
        src="${imagen}"
        alt="${nombre}"
      >
    </div>

    <div
      class="
        modal-body
        py-3 px-4
        absolute top-96 left-0
        bg-white rounded-t-2xl
      "
    >
      <section class="flex flex-row items-center justify-between mb-4">
        <div class="flex flex-row items-center">
          <h3 class="mr-2 text-2xl font-bold text-Black">${nombre}</h3>
          <img
            src="https://res.cloudinary.com/dz8on44po/image/upload/v1649731328/dogs/Property_1_male_gq5uzh.png"
            height="32px" width="32px"
          >
        </div>

        <button class="bg-red h-12" type="button" id="favoritos" onclick="guardarFavorito('${id},${mascota}')">fav</button>
      </section>

      <section class="flex flex-row items-center justify-between mb-4">
        <div class="flex flex-row items-center justify-start w-full">
          <img src="https://res.cloudinary.com/dz8on44po/image/upload/v1649731829/dogs/Property_1_raza_wuupdp.png">
          <p class="ml-2 text-sm text-Grey">${raza}</p>
        </div>

        <div class="flex flex-row items-center justify-start w-full">
          <img src="https://res.cloudinary.com/dz8on44po/image/upload/v1649731838/dogs/Property_1_edad_xyyhzv.png">
          <p class="ml-2 text-sm text-Grey">${edad}</p>
        </div>
      </section>

      <div class="flex flex-row items-start" style="margin-bottom: 32px">
        <img src="https://res.cloudinary.com/dz8on44po/image/upload/v1649731940/dogs/Property_1_map-pin_rozdne.png">
        <p class="ml-2 text-sm text-Grey">${ubicacion}</p>
        <img>
      </div>

      <section style="margin-bottom: 32px">
        <h4 class="text-lg font-bold text-Black mb-2">
          Personalidad
        </h4>
        <div class="flex flex-row items-center justify-between">
          <li
            class="
              flex flex-column
              items-center justify-center
              w-24 h-24 p-2
              border-2 border-Secondary
              rounded-lg
            "
          >
            <img
              src="https://res.cloudinary.com/dz8on44po/image/upload/v1649731992/dogs/Property_1_Cari%C3%B1oso_svopq5.png"
              height="40px" width="40px"
            >
            <p class="mt-2 text-base font-normal text-Grey">${p1}</p>
          </li>

          <li
            class="
              flex flex-column
              items-center justify-center
              w-24 h-24 p-2
              border-2 border-Secondary
              rounded-lg
            "
          >
            <img
              src="https://res.cloudinary.com/dz8on44po/image/upload/v1649731992/dogs/Property_1_Inquieto_qaijj5.png"
              height="40px" width="40px"
            >
            <p class="mt-2 text-base font-normal text-Grey">${p2}</p>
          </li>

          <li
            class="
              flex flex-column
              items-center justify-center
              w-24 h-24 p-2
              border-2 border-Secondary
              rounded-lg
            "
          >
            <img
              src="https://res.cloudinary.com/dz8on44po/image/upload/v1649731992/dogs/Property_1_Jugueton_ar0ckb.png"
              height="40px" width="40px"
            >
            <p class="mt-2 text-base font-normal text-Grey">${p3}</p>
          </li>
        </div>
      </section>

      <section style="margin-bottom: 32px">
        <h4 class="text-lg font-bold text-Black mb-2">
          Historia de ${nombre}
        </h4>
        <p class="text-base-font-normal text-Grey">
          ${descripcion}
        </p>
      </section>

      <section class="flex flex-row items-center justify-between w-full">
        <div class="flex flex-row items-center">
          <img
            src="${usuario.picture}"
            alt=${usuario.name.first}
            class="card-img-top w-12 h-12 rounded-full border-3 border-Green"
          >
          <div class="ml-2">
            <p class="text-xs font-normal text-Grey">
              Publicado por
            </p>
            <p class="text-sm font-bold text-Black">
              ${usuario.name.first} ${usuario.name.last}
            </p>
          </div>
        </div>

        <button
          type="button"
          id="contacto"
          onclick="guardarUsuario(${usuario.id})"
          class="h-12 w-36 bg-Black text-white font-bold rounded-full"
        >
          Contactar
        </button>
      </section>
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
  const btnActivo = `${'<img src="https://res.cloudinary.com/dz8on44po/image/upload/v1649735917/dogs/Property_1_Guardado_seuwvh.png" height="50px" width="50px">' }` //Template literal HTML Icon
  const btnInactivo = `${'<img src="https://res.cloudinary.com/dz8on44po/image/upload/v1649735914/dogs/Property_1_No_guardado_aawijm.png" height="50px" width="50px">' }`
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
