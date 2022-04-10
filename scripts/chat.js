let headerChat = document.getElementById('headerChat')

const recuperarUsuario = () => {
  let usuarioId = localStorage.getItem('Usuario')
  return usuarioId
}

const renderUsuario = async () => {
  const { data:detalleUsuario } = await axios.get(`${API_HOST}/usuarios/${recuperarUsuario()}`)
  const { name: { first, last }, picture } = detalleUsuario

  headerChat.innerHTML = `
    <button>atras</button>
    <div>
      <img src="${picture}">
      <p>${first} ${last} </p>
    </div>

  `
}

renderUsuario ()