// URL de la API
const apiURL = 'http://192.168.1.7:3000/api/products'; // Asegúrate de que esta URL sea correcta

// Elementos del DOM
const tablaProductos = document.getElementById('tablaProductos');
const btnAgregar = document.getElementById('btnAgregar');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const cerrarModal = document.getElementsByClassName('cerrar')[0];
const formProducto = document.getElementById('formProducto');
const productoIdInput = document.getElementById('productoId');
const nombreInput = document.getElementById('nombre');
const precioInput = document.getElementById('precio');
const descripcionInput = document.getElementById('descripcion');
const stockInput = document.getElementById('stock');

const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');

// Función para obtener y mostrar los productos
async function obtenerProductos() {
    try {
        const respuesta = await fetch(apiURL);
        const productos = await respuesta.json();

        // Limpiamos la tabla antes de agregar los productos
        tablaProductos.innerHTML = '';

        // Recorremos el array de productos y creamos una fila por cada uno
        productos.forEach(producto => {
            const fila = document.createElement('tr');

            // Guardamos el ID en un atributo de la fila (para usarlo luego)
            fila.setAttribute('data-id', producto.idproducto);

            // Creamos las celdas
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = producto.nombre; 

            const celdaPrecio = document.createElement('td');
            celdaPrecio.textContent = `$${producto.precio.toFixed(2)}`; 

            const celdaDescripcion = document.createElement('td');
            celdaDescripcion.textContent = producto.descripcion; 

            const celdaSTOCK = document.createElement('td');
            celdaSTOCK.textContent = producto.stock; 

            const celdaFechaCreacion = document.createElement('td');
            celdaFechaCreacion.textContent = new Date(producto.created_at).toLocaleDateString(); // Fecha de creación

            const celdaFechaModificacion = document.createElement('td');
            celdaFechaModificacion.textContent = new Date(producto.updated_at).toLocaleDateString(); // Fecha de modificación

            const celdaAcciones = document.createElement('td');

            // Botón Editar (con ícono)
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = `<i class='bx bx-edit'></i>`;
            btnEditar.classList.add('btn-editar');
            btnEditar.addEventListener('click', () => abrirModalEditar(producto));

            // Botón Eliminar (con ícono)
            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = `<i class='bx bx-trash'></i>`;
            btnEliminar.classList.add('btn-eliminar');
            btnEliminar.addEventListener('click', () => confirmarEliminar(producto.idproducto));

            // Agregamos los botones a la celda de acciones
            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);

            // Agregamos las celdas a la fila
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaPrecio);
            fila.appendChild(celdaDescripcion);
            fila.appendChild(celdaSTOCK);
            fila.appendChild(celdaFechaCreacion);
            fila.appendChild(celdaFechaModificacion);
            fila.appendChild(celdaAcciones);

            // Agregamos la fila a la tabla
            tablaProductos.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

// Llamamos a la función al cargar la página
obtenerProductos();

// Evento para abrir el modal al hacer clic en "Agregar Producto"
btnAgregar.addEventListener('click', () => {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Agregar Producto';
    formProducto.reset(); // Limpiamos el formulario
    productoIdInput.value = ''; // Nos aseguramos de que el ID esté vacío
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
formProducto.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitamos que se recargue la página

    // Obtenemos los valores de los campos
    const id = productoIdInput.value;
    const nombre = nombreInput.value;
    const precio = precioInput.value;
    const descripcion = descripcionInput.value;
    const stock = stockInput.value;

    // Creamos un objeto con los datos
    const producto = {
        Nombre: nombre,
        Precio: precio,
        Descripcion: descripcion,
        STOCK: stock
    };

    try {
        if (id) {
            // Si hay un ID, actualizamos el producto existente (PUT)
            const respuesta = await fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
            const productoActualizado = await respuesta.json();
            console.log('Producto actualizado:', productoActualizado);
        } else {
            // Si no hay ID, creamos un nuevo producto (POST)
            const respuesta = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
            const nuevoProducto = await respuesta.json();
            console.log('Producto creado:', nuevoProducto);
        }

        // Cerramos el modal y recargamos la lista de productos
        modal.style.display = 'none';
        obtenerProductos();
    } catch (error) {
        console.error('Error al guardar producto:', error);
    }
});

// Función para abrir el modal en modo edición
function abrirModalEditar(producto) {
    modal.style.display = 'block';
    modalTitulo.textContent = 'Editar Producto';

    // Rellenamos los campos con los datos del producto
    productoIdInput.value = producto.idproducto;
    nombreInput.value = producto.nombre;
    precioInput.value = producto.precio;
    descripcionInput.value = producto.descripcion;
    stockInput.value = producto.stock;
}

// Manejo de la eliminación de productos
let productoAEliminarId = null;

// Función para mostrar el modal de confirmación
function confirmarEliminar(id) {
    productoAEliminarId = id; // Guardamos el ID del producto a eliminar
    modalConfirmacion.style.display = 'block';
}

// Evento para cancelar la eliminación
btnCancelarEliminar.addEventListener('click', () => {
    modalConfirmacion.style.display = 'none';
    productoAEliminarId = null;
});

// Evento para confirmar la eliminación
btnConfirmarEliminar.addEventListener('click', async () => {
    try {
        const respuesta = await fetch(`${apiURL}/${productoAEliminarId}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            console.log(`Producto con ID ${productoAEliminarId} eliminado.`);
            modalConfirmacion.style.display = 'none';
            productoAEliminarId = null;
            obtenerProductos(); // Actualizamos la lista
        } else {
            throw new Error('No se pudo eliminar el producto');
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
});

// Cerrar el modal de confirmación si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target == modalConfirmacion) {
        modalConfirmacion.style.display = 'none';
        productoAEliminarId = null;
    }
});