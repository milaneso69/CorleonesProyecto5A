const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Configuración de Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'INTEGRATIVE PROJECT API.', // Título de la Documentación
            version: '1.0.0', // Versión de la API
            description: 'API Documentation for Integrative Project and Barbershop Details.',
        },
        servers: [
            {
                // url: 'http://localhost:'+process.env.PORT , // URL Base del Servidor de la API
                url: `http://192.168.1.68:${process.env.PORT || 3000}`

            },
        ],
    },
    apis: ['./app/routes/*.js'], // Rutas Donde están tus Archivos de Rutas para generar la Documentación Automática
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve,
        swaggerUi.setup(swaggerSpec));
        console.log(`Swagger docs available at http://192.168.1.68:${process.env.PORT || 3000}/api-docs`);
        // console.log('Swagger docs available at http://localhost:'+
        //   process.env.PORT+'/api-docs');
};

module.exports = swaggerDocs;