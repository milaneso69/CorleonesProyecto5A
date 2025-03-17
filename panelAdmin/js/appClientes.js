// URL de la API
const apiURL = 'http://192.168.1.7:3000/api/clients'; // Asegúrate de que esta URL sea correcta

// Elementos del DOM
const tablaClientes = document.getElementById('tablaClientes');
const btnAgregar = document.getElementById('btnAgregar');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const cerrarModal = document.getElementsByClassName('cerrar')[0];
const formCliente = document.getElementById('formCliente');
const clienteIdInput = document.getElementById('clienteId');
const nombreInput = document.getElementById('nombre');
const apPaternoInput = document.getElementById('apPaterno');
const apMaternoInput = document.getElementById('apMaterno');
const telefonoInput = document.getElementById('telefono');
const idUsuarioInput = document.getElementById('idUsuario');

const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');

// Función para obtener y mostrar los clientes
async function obtenerClientes() {
    try {
        const respuesta = await fetch(apiURL);
        const clientes = await respuesta.json();

        // Limpiamos la tabla antes de agregar los clientes
        tablaClientes.innerHTML = '';

        // Recorremos el array de clientes y creamos una fila por cada uno
        clientes.forEach(cliente => {
            const fila = document.createElement('tr');

            // Guardamos el ID en un atributo de la fila (para usarlo luego)
            fila.setAttribute('data-id', cliente.idcliente);

            // Creamos las celdas
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = cliente.nombre; 

            const celdaApPaterno = document.createElement('td');
            celdaApPaterno.textContent = cliente.appaterno; 

            const celdaApMaterno = document.createElement('td');
            celdaApMaterno.textContent = cliente.apmaterno; 

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = cliente.telefono; 

            const celdaFechaCreacion = document.createElement('td');
            celdaFechaCreacion.textContent = new Date(cliente.created_at).toLocaleDateString(); // Fecha de creación

            const celdaFechaModificacion = document.createElement('td');
            celdaFechaModificacion.textContent = new Date(cliente.updated_at).toLocaleDateString(); // Fecha de modificación

            const celdaAcciones = document.createElement('td');

            // Botón Editar (con ícono)
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = `<i class='bx bx-edit'></i>`;
            btnEditar.classList.add('btn-editar');
            btnEditar.addEventListener('click', () => abrirModalEditar(cliente));

            // Botón Eliminar (con ícono)
            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = `<i class='bx bx-trash'></i>`;
            btnEliminar.classList.add('btn-eliminar');
            btnEliminar.addEventListener('click', () => confirmarEliminar(cliente.idcliente));

            // Agregamos los botones a la celda de acciones
            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);

            // Agregamos las celdas a la fila
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaApPaterno);
            fila.appendChild(celdaApMaterno);
            fila.appendChild(celdaTelefono);
            fila.appendChild(celdaFechaCreacion);
            fila.appendChild(celdaFechaModificacion); // Agregamos la celda de fecha de modificación
            fila.appendChild(celdaAcciones);

            // Agregamos la fila a la tabla
            tablaClientes.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener clientes:', error);
    }
}

// Llamamos a la función al cargar la página
obtenerClientes();

// Evento para abrir el modal al hacer clic en "Agregar Cliente"
btnAgregar.addEventListener('click', () => {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Agregar Cliente';
    formCliente.reset(); // Limpiamos el formulario
    clienteIdInput.value = ''; // Nos aseguramos de que el ID esté vacío
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
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitamos que se recargue la página

    // Obtenemos los valores de los campos
    const id = clienteIdInput.value;
    const nombre = nombreInput.value;
    const appaterno = apPaternoInput.value;
    const apmaterno = apMaternoInput.value;
    const telefono = telefonoInput.value;
    const idusuario = idUsuarioInput.value;

    // Creamos un objeto con los datos
    const cliente = {
        Nombre: nombre,
        ApPaterno: appaterno,
        ApMaterno: apmaterno,
        Telefono: telefono,
        IdUsuario: idusuario
    };

    try {
        if (id) {
            // Si hay un ID, actualizamos el cliente existente (PUT)
            const respuesta = await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            const clienteActualizado = await respuesta.json();
            console.log('Cliente actualizado:', clienteActualizado);
        } else {
            // Si no hay ID, creamos un nuevo cliente (POST)
            const respuesta = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            const nuevoCliente = await respuesta.json();
            console.log('Cliente creado:', nuevoCliente);
        }

        // Cerramos el modal y recargamos la lista de clientes
        modal.style.display = 'none';
        obtenerClientes();
    } catch (error) {
        console.error('Error al guardar cliente:', error);
    }
});

// Función para abrir el modal en modo edición
function abrirModalEditar(cliente) {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Editar Cliente';

    // Rellenamos los campos con los datos del cliente
    clienteIdInput.value = cliente.idcliente;
    nombreInput.value = cliente.nombre;
    apPaternoInput.value = cliente.appaterno;
    apMaternoInput.value = cliente.apmaterno;
    telefonoInput.value = cliente.telefono;
    idUsuarioInput.value = cliente.idusuario;
}

// Manejo de la eliminación de clientes
let clienteAEliminarId = null;

// Función para mostrar el modal de confirmación
function confirmarEliminar(id) {
    clienteAEliminarId = id; // Guardamos el ID del cliente a eliminar
    modalConfirmacion.style.display = 'block';
}

// Evento para cancelar la eliminación
btnCancelarEliminar.addEventListener('click', () => {
    modalConfirmacion.style.display = 'none';
    clienteAEliminarId = null;
});

// Evento para confirmar la eliminación
btnConfirmarEliminar.addEventListener('click', async () => {
    try {
        const respuesta = await fetch(`${apiURL}/${clienteAEliminarId}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            console.log(`Cliente con ID ${clienteAEliminarId} eliminado.`);
            modalConfirmacion.style.display = 'none';
            clienteAEliminarId = null;
            obtenerClientes(); // Actualizamos la lista
        } else {
            throw new Error('No se pudo eliminar el cliente');
        }
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
    }
});

// Cerrar el modal de confirmación si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target == modalConfirmacion) {
        modalConfirmacion.style.display = 'none';
        clienteAEliminarId = null;
    }
});