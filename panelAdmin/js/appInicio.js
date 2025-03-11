document.addEventListener('DOMContentLoaded', function () {
    // Datos estáticos para las gráficas
    const datos = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'], // Etiquetas del eje X
        valores: [65, 59, 80, 81, 56] // Valores del eje Y
    };

    // Gráfica 1: Barras
    const ctx1 = document.getElementById('grafica1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar', // Tipo de gráfica
        data: {
            labels: datos.labels, // Etiquetas del eje X
            datasets: [{
                label: 'Ventas mensuales',
                data: datos.valores, // Valores del eje Y
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo
                borderColor: 'rgba(255, 99, 132, 1)', // Color del borde
                borderWidth: 1 // Ancho del borde
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true // Comenzar el eje Y desde 0
                }
            }
        }
    });

    // Gráfica 2: Líneas
    const ctx2 = document.getElementById('grafica2').getContext('2d');
    new Chart(ctx2, {
        type: 'line', // Tipo de gráfica
        data: {
            labels: datos.labels, // Etiquetas del eje X
            datasets: [{
                label: 'Ventas mensuales',
                data: datos.valores, // Valores del eje Y
                borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
                borderWidth: 2, // Ancho de la línea
                fill: false // No rellenar el área bajo la línea
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true // Comenzar el eje Y desde 0
                }
            }
        }
    });
});