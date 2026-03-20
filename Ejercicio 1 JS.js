//Ronald Catún 19789

// A
const habilidades = [
  "JavaScript",
  "CSS",
  "APIs",
  "HTML",
  "Node.js",
  "Git"
];

// B
const mostrarEtiquetas = (lista) => {
  const contenedor = document.querySelector("#etiquetas");
  contenedor.innerHTML = "";
  lista.forEach((habilidad) => {
    const span = document.createElement("span");
    span.classList.add("etiqueta");
    span.textContent = habilidad;
    contenedor.appendChild(span);
  });
};

// C
const construirPerfil = (datos) => {
  return {
    nombre:  datos.name     || "Sin nombre",
    usuario: "@" + datos.login,
    email:   datos.email    || "No disponible",
    ciudad:  datos.location || "Sin ubicación",
    avatar:  datos.avatar_url
  };
};

// D
const renderizarPerfil = (perfil) => {
  document.querySelector("#nombre").textContent  = perfil.nombre;
  document.querySelector("#usuario").textContent = perfil.usuario;
  document.querySelector("#email").textContent   = perfil.email;
  document.querySelector("#ciudad").textContent  = perfil.ciudad;
  document.querySelector("#avatar").src          = perfil.avatar;
};

// E
const cargarUsuario = async () => {
  const mensaje = document.querySelector("#mensaje");

  try {
    mensaje.textContent = "Cargando...";

    const respuesta = await fetch("https://api.github.com/users");
    const listaUsuarios = await respuesta.json();

    const indice = Math.floor(Math.random() * listaUsuarios.length);
    const loginElegido = listaUsuarios[indice].login;

    const detalle = await fetch(`https://api.github.com/users/${loginElegido}`);
    const datos   = await detalle.json();

    const perfil = construirPerfil(datos);
    renderizarPerfil(perfil);
    mostrarEtiquetas(habilidades);

    mensaje.textContent = "";

  } catch (error) {
    mensaje.textContent = "Error al cargar usuario";
  }
};

// F
document.querySelector("#btn").addEventListener("click", cargarUsuario);
