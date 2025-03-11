// URL de la API
const apiURL = 'https://jsonplaceholder.typicode.com/users';

// Elementos del DOM
const tablaUsuarios = document.getElementById('tablaUsuarios');
const btnAgregar = document.getElementById('btnAgregar');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const cerrarModal = document.getElementsByClassName('cerrar')[0];
const formUsuario = document.getElementById('formUsuario');
const usuarioIdInput = document.getElementById('usuarioId');
const correoInput = document.getElementById('correo');
const contraseniaInput = document.getElementById('contrasenia');

const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');

// Función para obtener y mostrar los usuarios
async function obtenerUsuarios() {
    try {
        const respuesta = await fetch(apiURL);
        const usuarios = await respuesta.json();

        // Limpiamos la tabla antes de agregar los usuarios
        tablaUsuarios.innerHTML = '';

        // Recorremos el array de usuarios y creamos una fila por cada uno
        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');

            // Guardamos el ID en un atributo de la fila (para usarlo luego)
            fila.setAttribute('data-id', usuario.idusuario);

            // Creamos las celdas (sin el ID)
            const celdaCorreo = document.createElement('td');
            celdaCorreo.textContent = usuario.correo;

            const celdaFechaCreacion = document.createElement('td');
            celdaFechaCreacion.textContent = new Date(usuario.created_at).toLocaleDateString();

            const celdaAcciones = document.createElement('td');

            // Botón Editar (con ícono)
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = `<i class='bx bx-edit'></i>`; // Ícono de editar
            btnEditar.classList.add('btn-editar'); // Clase para estilos
            btnEditar.addEventListener('click', () => abrirModalEditar(usuario));

            // Botón Eliminar (con ícono)
            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = `<i class='bx bx-trash'></i>`; // Ícono de eliminar
            btnEliminar.classList.add('btn-eliminar'); // Clase para estilos
            btnEliminar.addEventListener('click', () => confirmarEliminar(usuario.idusuario));

            // Agregamos los botones a la celda de acciones
            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);

            // Agregamos las celdas a la fila (sin el ID)
            fila.appendChild(celdaCorreo);
            fila.appendChild(celdaFechaCreacion);
            fila.appendChild(celdaAcciones);

            // Agregamos la fila a la tabla
            tablaUsuarios.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

// Llamamos a la función al cargar la página
obtenerUsuarios();

// Evento para abrir el modal al hacer clic en "Agregar Usuario"
btnAgregar.addEventListener('click', () => {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Agregar Usuario';
    formUsuario.reset(); // Limpiamos el formulario
    usuarioIdInput.value = ''; // Nos aseguramos de que el ID esté vacío
});

// Evento para cerrar el modal al hacer clic en la "X"
cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Evento para enviar el formulario
formUsuario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitamos que se recargue la página

    // Obtenemos los valores de los campos
    const id = usuarioIdInput.value;
    const correo = correoInput.value;
    const contrasenia = contraseniaInput.value;

    // Creamos un objeto con los datos
    const usuario = {
        correo: correo,
        contrasenia: contrasenia
    };

    try {
        if (id) {
            // Si hay un ID, actualizamos el usuario existente (PUT)
            const respuesta = await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            const usuarioActualizado = await respuesta.json();
            console.log('Usuario actualizado:', usuarioActualizado);
        } else {
            // Si no hay ID, creamos un nuevo usuario (POST)
            const respuesta = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            const nuevoUsuario = await respuesta.json();
            console.log('Usuario creado:', nuevoUsuario);
        }

        // Cerramos el modal y recargamos la lista de usuarios
        modal.style.display = 'none';
        obtenerUsuarios();
    } catch (error) {
        console.error('Error al guardar usuario:', error);
    }
});

// Función para abrir el modal en modo edición
function abrirModalEditar(usuario) {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Editar Usuario';

    // Rellenamos los campos con los datos del usuario
    usuarioIdInput.value = usuario.idusuario;
    correoInput.value = usuario.correo;
    contraseniaInput.value = ''; // No mostramos la contraseña por seguridad
}

// Manejo de la eliminación de usuarios
let usuarioAEliminarId = null;

// Función para mostrar el modal de confirmación
function confirmarEliminar(id) {
    usuarioAEliminarId = id; // Guardamos el ID del usuario a eliminar
    modalConfirmacion.style.display = 'block';
}

// Evento para cancelar la eliminación
btnCancelarEliminar.addEventListener('click', () => {
    modalConfirmacion.style.display = 'none';
    usuarioAEliminarId = null;
});

// Evento para confirmar la eliminación
btnConfirmarEliminar.addEventListener('click', async () => {
    try {
        const respuesta = await fetch(`${apiURL}/${usuarioAEliminarId}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            console.log(`Usuario con ID ${usuarioAEliminarId} eliminado.`);
            modalConfirmacion.style.display = 'none';
            usuarioAEliminarId = null;
            obtenerUsuarios(); // Actualizamos la lista
        } else {
            throw new Error('No se pudo eliminar el usuario');
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
});

// Cerrar el modal de confirmación si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target == modalConfirmacion) {
        modalConfirmacion.style.display = 'none';
        usuarioAEliminarId = null;
    }
});