let headerChat = document.getElementById('headerChat')

const recuperarUsuario = () => {
  let usuarioId = localStorage.getItem('Usuario')
  return usuarioId
}

const renderUsuario = async () => {
  const { data:detalleUsuario } = await axios.get(`${API_HOST}/usuarios/${recuperarUsuario()}`)
  const { name: { first, last }, picture } = detalleUsuario

  headerChat.innerHTML = `
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

    <div class="flex flex-column items-center text-center">
      <img
        src="${picture}"
        alt="${first} ${last}"
        class="card-img-top w-16 h-16 mb-2 rounded-full border-3 border-Green"
      >
      <p class="text-base font-bold text-Black">
        ${first} ${last}
      </p>
    </div>
  `
}

renderUsuario ()
