// URL de la API
const apiURL = 'http://192.168.1.13:3000/api/services'; // Asegúrate de que esta URL sea correcta

// Elementos del DOM
const tablaServicios = document.getElementById('tablaServicios');
const btnAgregar = document.getElementById('btnAgregar');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const cerrarModal = document.getElementsByClassName('cerrar')[0];
const formServicio = document.getElementById('formServicio');
const servicioIdInput = document.getElementById('servicioId');
const nombreInput = document.getElementById('nombre');
const descripcionInput = document.getElementById('descripcion');
const precioInput = document.getElementById('precio');

const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');

// Función para obtener y mostrar los servicios
// Función para obtener y mostrar los servicios
async function obtenerServicios() {
    try {
        const respuesta = await fetch(apiURL);
        const servicios = await respuesta.json();

        // Limpiamos la tabla antes de agregar los servicios
        tablaServicios.innerHTML = '';

        // Recorremos el array de servicios y creamos una fila por cada uno
        servicios.forEach(servicio => {
            const fila = document.createElement('tr');

            // Guardamos el ID en un atributo de la fila (para usarlo luego)
            fila.setAttribute('data-id', servicio.idservicio);

            // Creamos las celdas
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = servicio.nombre; 

            const celdaDescripcion = document.createElement('td');
            celdaDescripcion.textContent = servicio.descripcion; 

            const celdaPrecio = document.createElement('td');
            // Convertimos el precio a número antes de usar toFixed
            const precio = parseFloat(servicio.precio); // Convertir a número
            celdaPrecio.textContent = `$${precio.toFixed(2)}`; 

            const celdaFechaCreacion = document.createElement('td');
            celdaFechaCreacion.textContent = new Date(servicio.created_at).toLocaleDateString(); // Fecha de creación

            const celdaFechaModificacion = document.createElement('td');
            celdaFechaModificacion.textContent = new Date(servicio.updated_at).toLocaleDateString(); // Fecha de modificación

            const celdaAcciones = document.createElement('td');

            // Botón Editar (con ícono)
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = `<i class='bx bx-edit'></i>`;
            btnEditar.classList.add('btn-editar');
            btnEditar.addEventListener('click', () => abrirModalEditar(servicio));

            // Botón Eliminar (con ícono)
            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = `<i class='bx bx-trash'></i>`;
            btnEliminar.classList.add('btn-eliminar');
            btnEliminar.addEventListener('click', () => confirmarEliminar(servicio.idservicio));

            // Agregamos los botones a la celda de acciones
            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);

            // Agregamos las celdas a la fila
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaDescripcion);
            fila.appendChild(celdaPrecio);
            fila.appendChild(celdaFechaCreacion);
            fila.appendChild(celdaFechaModificacion);
            fila.appendChild(celdaAcciones);

            // Agregamos la fila a la tabla
            tablaServicios.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener servicios:', error);
    }
}

// Llamamos a la función al cargar la página
obtenerServicios();

// Evento para abrir el modal al hacer clic en "Agregar Servicio"
btnAgregar.addEventListener('click', () => {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Agregar Servicio';
    formServicio.reset(); // Limpiamos el formulario
    servicioIdInput.value = ''; // Nos aseguramos de que el ID esté vacío
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
formServicio.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitamos que se recargue la página

    // Obtenemos los valores de los campos
    const id = servicioIdInput.value;
    const nombre = nombreInput.value;
    const descripcion = descripcionInput.value;
    const precio = precioInput.value;

    // Creamos un objeto con los datos
    const servicio = {
        Nombre: nombre,
        Descripcion: descripcion,
        Precio: precio
    };

    try {
        if (id) {
            // Si hay un ID, actualizamos el servicio existente (PUT)
            const respuesta = await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(servicio)
            });
            const servicioActualizado = await respuesta.json();
            console.log('Servicio actualizado:', servicioActualizado);
        } else {
            // Si no hay ID, creamos un nuevo servicio (POST)
            const respuesta = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(servicio)
            });
            const nuevoServicio = await respuesta.json();
            console.log('Servicio creado:', nuevoServicio);
        }

        // Cerramos el modal y recargamos la lista de servicios
        modal.style.display = 'none';
        obtenerServicios();
    } catch (error) {
        console.error('Error al guardar servicio:', error);
    }
});

// Función para abrir el modal en modo edición
function abrirModalEditar(servicio) {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Editar Servicio';

    // Rellenamos los campos con los datos del servicio
    servicioIdInput.value = servicio.idservicio;
    nombreInput.value = servicio.nombre;
    descripcionInput.value = servicio.descripcion;
    precioInput.value = servicio.precio;
}

// Manejo de la eliminación de servicios
let servicioAEliminarId = null;

// Función para mostrar el modal de confirmación
function confirmarEliminar(id) {
    servicioAEliminarId = id; // Guardamos el ID del servicio a eliminar
    modalConfirmacion.style.display = 'block';
}

// Evento para cancelar la eliminación
btnCancelarEliminar.addEventListener('click', () => {
    modalConfirmacion.style.display = 'none';
    servicioAEliminarId = null;
});

// Evento para confirmar la eliminación
btnConfirmarEliminar.addEventListener('click', async () => {
    try {
        const respuesta = await fetch(`${apiURL}/${servicioAEliminarId}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            console.log(`Servicio con ID ${servicioAEliminarId} eliminado.`);
            modalConfirmacion.style.display = 'none';
            servicioAEliminarId = null;
            obtenerServicios(); // Actualizamos la lista
        } else {
            throw new Error('No se pudo eliminar el servicio');
        }
    } catch (error) {
        console.error('Error al eliminar servicio:', error);
    }
});

// Cerrar el modal de confirmación si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target == modalConfirmacion) {
        modalConfirmacion.style.display = 'none';
        servicioAEliminarId = null;
    }
});