// URL de la API
const apiURL = 'http://192.168.1.13:3000/api/appointments'; // URL para obtener citas
const apiClientesURL = 'http://192.168.1.13:3000/api/clients'; // URL para obtener clientes
const apiServiciosURL = 'http://192.168.1.13:3000/api/services'; // URL para obtener servicios

// Elementos del DOM
const tablaCitas = document.getElementById('tablaCitas');
const btnAgregar = document.getElementById('btnAgregar');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const cerrarModal = document.getElementsByClassName('cerrar')[0];
const formCita = document.getElementById('formCita');
const citaIdInput = document.getElementById('citaId');
const idClienteInput = document.getElementById('idCliente');
const idServicioInput = document.getElementById('idServicio');
const fechaAgendadaInput = document.getElementById('fechaAgendada');

const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');

// Función para obtener y mostrar las citas
async function obtenerCitas() {
    try {
        // Obtener las citas
        const respuestaCitas = await fetch(apiURL);
        const citas = await respuestaCitas.json();

        // Obtener los clientes
        const respuestaClientes = await fetch(apiClientesURL);
        const clientes = await respuestaClientes.json();

        // Obtener los servicios
        const respuestaServicios = await fetch(apiServiciosURL);
        const servicios = await respuestaServicios.json();

        // Limpiamos la tabla antes de agregar las citas
        tablaCitas.innerHTML = '';

        // Recorremos el array de citas y creamos una fila por cada una
        citas.forEach(cita => {
            const fila = document.createElement('tr');

            // Guardamos los IDs en atributos de la fila (para usarlos luego)
            fila.setAttribute('data-id-cita', cita.idcita);
            fila.setAttribute('data-id-cliente', cita.idcliente);
            fila.setAttribute('data-id-servicio', cita.idservicio);

            // Buscamos el cliente
            const cliente = clientes.find(cliente => cliente.idcliente === cita.idcliente);
            const nombreCompletoCliente = cliente 
                ? `${cliente.nombre} ${cliente.appaterno} ${cliente.apmaterno}` 
                : 'Cliente no encontrado';

            // Buscamos el nombre del servicio
            const servicio = servicios.find(servicio => servicio.idservicio === cita.idservicio);
            const nombreServicio = servicio ? servicio.nombre : 'Servicio no encontrado';

            // Creamos las celdas
            const celdaNombreCliente = document.createElement('td');
            celdaNombreCliente.textContent = nombreCompletoCliente; // Nombre completo del cliente

            const celdaNombreServicio = document.createElement('td');
            celdaNombreServicio.textContent = nombreServicio;

            const celdaFechaAgendada = document.createElement('td');
            celdaFechaAgendada.textContent = new Date(cita.fechaagendada).toLocaleString(); // Fecha formateada

            const celdaFechaCreacion = document.createElement('td');
            celdaFechaCreacion.textContent = new Date(cita.created_at).toLocaleDateString(); // Fecha de creación

            const celdaFechaModificacion = document.createElement('td');
            celdaFechaModificacion.textContent = new Date(cita.updated_at).toLocaleDateString(); // Fecha de modificación

            const celdaAcciones = document.createElement('td');

            // Botón Editar (con ícono)
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = `<i class='bx bx-edit'></i>`;
            btnEditar.classList.add('btn-editar');
            btnEditar.addEventListener('click', () => abrirModalEditar(cita));

            // Botón Eliminar (con ícono)
            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = `<i class='bx bx-trash'></i>`;
            btnEliminar.classList.add('btn-eliminar');
            btnEliminar.addEventListener('click', () => confirmarEliminar(cita.idcita));

            // Agregamos los botones a la celda de acciones
            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);

            // Agregamos las celdas a la fila
            fila.appendChild(celdaNombreCliente);
            fila.appendChild(celdaNombreServicio);
            fila.appendChild(celdaFechaAgendada);
            fila.appendChild(celdaFechaCreacion);
            fila.appendChild(celdaFechaModificacion);
            fila.appendChild(celdaAcciones);

            // Agregamos la fila a la tabla
            tablaCitas.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener citas:', error);
    }
}

// Llamamos a la función al cargar la página
obtenerCitas();

// Evento para abrir el modal al hacer clic en "Agregar Cita"
btnAgregar.addEventListener('click', () => {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Agregar Cita';
    formCita.reset(); // Limpiamos el formulario
    citaIdInput.value = ''; // Nos aseguramos de que el ID esté vacío
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
formCita.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitamos que se recargue la página

    // Obtenemos los valores de los campos
    const id = citaIdInput.value;
    const idCliente = idClienteInput.value;
    const idServicio = idServicioInput.value;
    const fechaAgendada = new Date(fechaAgendadaInput.value).toISOString(); // Convertimos a formato ISO 8601

    // Creamos un objeto con los datos
    const cita = {
        IdCliente: idCliente, // Asegúrate de que coincida con lo que espera la API
        IdServicio: idServicio, // Asegúrate de que coincida con lo que espera la API
        FechaAgendada: fechaAgendada // Asegúrate de que coincida con lo que espera la API
    };

    try {
        if (id) {
            // Si hay un ID, actualizamos la cita existente (PUT)
            const respuesta = await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cita)
            });
            const citaActualizada = await respuesta.json();
            console.log('Cita actualizada:', citaActualizada);
        } else {
            // Si no hay ID, creamos una nueva cita (POST)
            const respuesta = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cita)
            });
            const nuevaCita = await respuesta.json();
            console.log('Cita creada:', nuevaCita);
        }

        // Cerramos el modal y recargamos la lista de citas
        modal.style.display = 'none';
        obtenerCitas();
    } catch (error) {
        console.error('Error al guardar cita:', error);
    }
});

// Función para abrir el modal en modo edición
function abrirModalEditar(cita) {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Editar Cita';

    // Rellenamos los campos con los datos de la cita
    citaIdInput.value = cita.idcita;
    idClienteInput.value = cita.idcliente;
    idServicioInput.value = cita.idservicio;
    fechaAgendadaInput.value = cita.fechaagendada.replace('Z', ''); // Eliminamos la 'Z' para que funcione con datetime-local
}

// Manejo de la eliminación de citas
let citaAEliminarId = null;

// Función para mostrar el modal de confirmación
function confirmarEliminar(id) {
    citaAEliminarId = id; // Guardamos el ID de la cita a eliminar
    modalConfirmacion.style.display = 'block';
}

// Evento para cancelar la eliminación
btnCancelarEliminar.addEventListener('click', () => {
    modalConfirmacion.style.display = 'none';
    citaAEliminarId = null;
});

// Evento para confirmar la eliminación
btnConfirmarEliminar.addEventListener('click', async () => {
    try {
        const respuesta = await fetch(`${apiURL}/${citaAEliminarId}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            console.log(`Cita con ID ${citaAEliminarId} eliminada.`);
            modalConfirmacion.style.display = 'none';
            citaAEliminarId = null;
            obtenerCitas(); // Actualizamos la lista
        } else {
            throw new Error('No se pudo eliminar la cita');
        }
    } catch (error) {
        console.error('Error al eliminar cita:', error);
    }
});

// Cerrar el modal de confirmación si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target == modalConfirmacion) {
        modalConfirmacion.style.display = 'none';
        citaAEliminarId = null;
    }
});