// URL de la API
const apiURL = 'http://192.168.1.7:3000/api/employees'; // Asegúrate de que esta URL sea correcta

// Elementos del DOM
const tablaEmpleados = document.getElementById('tablaEmpleados');
const btnAgregar = document.getElementById('btnAgregar');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const cerrarModal = document.getElementsByClassName('cerrar')[0];
const formEmpleado = document.getElementById('formEmpleado');
const empleadoIdInput = document.getElementById('empleadoId');
const nombreInput = document.getElementById('nombre');
const apPaternoInput = document.getElementById('apPaterno');
const apMaternoInput = document.getElementById('apMaterno');
const telefonoInput = document.getElementById('telefono');
const nssInput = document.getElementById('nss');
const rfcInput = document.getElementById('rfc');
const idUsuarioInput = document.getElementById('idUsuario');

const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');

// Función para obtener y mostrar los empleados
async function obtenerEmpleados() {
    try {
        const respuesta = await fetch(apiURL);
        const empleados = await respuesta.json();

        // Limpiamos la tabla antes de agregar los empleados
        tablaEmpleados.innerHTML = '';

        // Recorremos el array de empleados y creamos una fila por cada uno
        empleados.forEach(empleado => {
            const fila = document.createElement('tr');

            // Guardamos el ID en un atributo de la fila (para usarlo luego)
            fila.setAttribute('data-id', empleado.idempleado);

            // Creamos las celdas
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = empleado.nombre; 

            const celdaApPaterno = document.createElement('td');
            celdaApPaterno.textContent = empleado.appaterno; 

            const celdaApMaterno = document.createElement('td');
            celdaApMaterno.textContent = empleado.apmaterno; 

            const celdaTelefono = document.createElement('td');
            celdaTelefono.textContent = empleado.telefono; 

            const celdaNSS = document.createElement('td');
            celdaNSS.textContent = empleado.nss; 

            const celdaRFC = document.createElement('td');
            celdaRFC.textContent = empleado.rfc; 

            const celdaFechaCreacion = document.createElement('td');
            celdaFechaCreacion.textContent = new Date(empleado.created_at).toLocaleDateString(); // Fecha de creación

            const celdaFechaModificacion = document.createElement('td');
            celdaFechaModificacion.textContent = new Date(empleado.updated_at).toLocaleDateString(); // Fecha de modificación

            const celdaAcciones = document.createElement('td');

            // Botón Editar (con ícono)
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = `<i class='bx bx-edit'></i>`;
            btnEditar.classList.add('btn-editar');
            btnEditar.addEventListener('click', () => abrirModalEditar(empleado));

            // Botón Eliminar (con ícono)
            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = `<i class='bx bx-trash'></i>`;
            btnEliminar.classList.add('btn-eliminar');
            btnEliminar.addEventListener('click', () => confirmarEliminar(empleado.idempleado));

            // Agregamos los botones a la celda de acciones
            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);

            // Agregamos las celdas a la fila
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaApPaterno);
            fila.appendChild(celdaApMaterno);
            fila.appendChild(celdaTelefono);
            fila.appendChild(celdaNSS);
            fila.appendChild(celdaRFC);
            fila.appendChild(celdaFechaCreacion);
            fila.appendChild(celdaFechaModificacion);
            fila.appendChild(celdaAcciones);

            // Agregamos la fila a la tabla
            tablaEmpleados.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener empleados:', error);
    }
}

// Llamamos a la función al cargar la página
obtenerEmpleados();

// Evento para abrir el modal al hacer clic en "Agregar Empleado"
btnAgregar.addEventListener('click', () => {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Agregar Empleado';
    formEmpleado.reset(); // Limpiamos el formulario
    empleadoIdInput.value = ''; // Nos aseguramos de que el ID esté vacío
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
formEmpleado.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitamos que se recargue la página

    // Obtenemos los valores de los campos
    const id = empleadoIdInput.value;
    const nombre = nombreInput.value;
    const appaterno = apPaternoInput.value;
    const apmaterno = apMaternoInput.value;
    const telefono = telefonoInput.value;
    const nss = nssInput.value;
    const rfc = rfcInput.value;
    const idusuario = idUsuarioInput.value;

    // Creamos un objeto con los datos
    const empleado = {
        Nombre: nombre,
        ApPaterno: appaterno,
        ApMaterno: apmaterno,
        Telefono: telefono,
        NSS: nss,
        RFC: rfc,
        IdUsuario: idusuario
    };

    try {
        if (id) {
            // Si hay un ID, actualizamos el empleado existente (PUT)
            const respuesta = await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empleado)
            });
            const empleadoActualizado = await respuesta.json();
            console.log('Empleado actualizado:', empleadoActualizado);
        } else {
            // Si no hay ID, creamos un nuevo empleado (POST)
            const respuesta = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empleado)
            });
            const nuevoEmpleado = await respuesta.json();
            console.log('Empleado creado:', nuevoEmpleado);
        }

        // Cerramos el modal y recargamos la lista de empleados
        modal.style.display = 'none';
        obtenerEmpleados();
    } catch (error) {
        console.error('Error al guardar empleado:', error);
    }
});

// Función para abrir el modal en modo edición
function abrirModalEditar(empleado) {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Editar Empleado';

    // Rellenamos los campos con los datos del empleado
    empleadoIdInput.value = empleado.idempleado;
    nombreInput.value = empleado.nombre;
    apPaternoInput.value = empleado.appaterno;
    apMaternoInput.value = empleado.apmaterno;
    telefonoInput.value = empleado.telefono;
    nssInput.value = empleado.nss;
    rfcInput.value = empleado.rfc;
    idUsuarioInput.value = empleado.idusuario;
}

// Manejo de la eliminación de empleados
let empleadoAEliminarId = null;

// Función para mostrar el modal de confirmación
function confirmarEliminar(id) {
    empleadoAEliminarId = id; // Guardamos el ID del empleado a eliminar
    modalConfirmacion.style.display = 'block';
}

// Evento para cancelar la eliminación
btnCancelarEliminar.addEventListener('click', () => {
    modalConfirmacion.style.display = 'none';
    empleadoAEliminarId = null;
});

// Evento para confirmar la eliminación
btnConfirmarEliminar.addEventListener('click', async () => {
    try {
        const respuesta = await fetch(`${apiURL}/${empleadoAEliminarId}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            console.log(`Empleado con ID ${empleadoAEliminarId} eliminado.`);
            modalConfirmacion.style.display = 'none';
            empleadoAEliminarId = null;
            obtenerEmpleados(); // Actualizamos la lista
        } else {
            throw new Error('No se pudo eliminar el empleado');
        }
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
    }
});

// Cerrar el modal de confirmación si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target == modalConfirmacion) {
        modalConfirmacion.style.display = 'none';
        empleadoAEliminarId = null;
    }
});