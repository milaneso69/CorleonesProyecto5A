// menu.js
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = `
    <section id="sidebar">
        <div class="brand">
            <img src="/img/corleonesss-blanco.png" alt="Logo" class="logo">
        </div>
        <ul class="side-menu top">
            <li>
                <a href="/panelAdmin/panelInicio.html">
                    <i class='bx bx-home'></i> 
                    <span class="text">Inicio</span>
                </a>
            </li>
            <li>
                <a href="/panelAdmin/panelUsuarios.html">
                    <i class='bx bx-user'></i>
                    <span class="text">Usuarios</span>
                </a>
            </li>
            <li>
                <a href="/panelAdmin/panelClientes.html">
                    <i class='bx bx-id-card'></i>
                    <span class="text">Clientes</span>
                </a>
            </li>
            <li>
                <a href="/panelAdmin/panelEmpleados.html">
                    <i class='bx bx-briefcase'></i>
                    <span class="text">Empleados</span>
                </a>
            </li>
            <li>
                <a href="/panelAdmin/panelProductos.html">
                    <i class='bx bx-package'></i>
                    <span class="text">Productos</span>
                </a>
            </li>
            <li>
                <a href="/panelAdmin/panelServicios.html">
                    <i class='bx bx-cut'></i>
                    <span class="text">Servicios</span>
                </a>
            </li>
            <li>
                <a href="/panelAdmin/panelCitas.html">
                    <i class='bx bx-calendar-check'></i>
                    <span class="text">Citas</span>
                </a>
            </li>
            <li>
                <a href="/panelAdmin/panelVentas.html">
                    <i class='bx bx-dollar'></i>
                    <span class="text">Ventas</span>
                </a>
            </li>
        </ul>
        <ul class="side-menu">
            <li>
                <a href="/panelAdmin/panelAjustes.html">
                    <i class='bx bx-cog'></i>
                    <span class="text">Ajustes</span>
                </a>
            </li>
            <li>
                <a href="#" class="logout">
                    <i class='bx bx-log-out'></i>
                    <span class="text">Log-out</span>
                </a>
            </li>
        </ul>
    </section>
    `;

    // Insertar el menú en el cuerpo del documento
    document.body.insertAdjacentHTML("afterbegin", sidebar);

    // Marcar la página activa
    const currentPage = window.location.pathname.split("/").pop(); // Obtener la página actual
    const menuLinks = document.querySelectorAll("#sidebar .side-menu.top li a");

    menuLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop(); // Obtener la página del enlace
        if (linkPage === currentPage) {
            link.parentElement.classList.add("active"); // Aplicar la clase "active"
        }
    });

    // Disparar un evento personalizado para indicar que el menú está listo
    const event = new Event("menuLoaded");
    document.dispatchEvent(event);
});