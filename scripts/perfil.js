const containerAvatar = document.getElementById('containerAvatar')
const containerDatos = document.getElementById('containerDatos')

const  objetoFormulario = {
  form: document.getElementById('form'),
  nombre: document.getElementById('userName'),
  apellido: document.getElementById('userLastName'),
  email: document.getElementById('userEmail'),
  actualizar: document.getElementById('userUpdate'),
  picture: document.getElementById('userPicture'),
}

const toggleEditar = (e) => {
  const editarEstado = JSON.parse(localStorage.getItem('EditarUsuario'))
  cambiarEstadoEditar(!editarEstado)
}

const guardarEdicionUsuario = async (e) => {
  e.preventDefault()
  const datos = {
    name: {
      first: objetoFormulario.nombre.value,
      last: objetoFormulario.apellido.value,
    },
    email: objetoFormulario.email.value,
    picture: objetoFormulario.picture.value,
  }

  const {data:resultado} = await axios.put(`${API_HOST}/usuarios/3`, datos)
  console.log(resultado)
}

objetoFormulario.form.addEventListener('submit', guardarEdicionUsuario)

const renderPerfilSesion = async () => {
  const { data:detalleUsuario } = await axios.get(`${API_HOST}/usuarios/3`)
  const { name: { first, last }, picture, email } = detalleUsuario

  objetoFormulario.nombre.value = first
  objetoFormulario.apellido.value = last
  objetoFormulario.email.value = email
  objetoFormulario.picture.value = picture

  cambiarEstadoEditar(true)

  containerAvatar.innerHTML = `
    <div class="flex flex-column items-center text-center">
      <img
        src="${picture}"
        alt="${first} ${last}"
        class="w-20 h-20 rounded-full mb-2"
      >
      <p class="text-base font-normal text-Black">
        ${first} ${last}
        </p>
      <button
        id ="editarCuenta"
        class="text-sm font-normal text-Black"
      >
        Editar Cuenta
      </button>
    </div>
  `

  const editarCuenta = document.getElementById('editarCuenta')
  editarCuenta.addEventListener('click', toggleEditar)
}

const cambiarEstadoEditar = (estado = false) => {
  localStorage.setItem('EditarUsuario', JSON.stringify(estado))
  objetoFormulario.nombre.disabled = estado
  objetoFormulario.apellido.disabled = estado
  objetoFormulario.email.disabled = estado
}

renderPerfilSesion()
