// index.js

const express = require('express');
const cors = require('cors');
const userRoutes = require('./app/routes/userRoutes');
const servicioRoutes = require('./app/routes/servicioRoutes');
const productRoutes = require('./app/routes/productRoutes');
const empleadoRoutes = require('./app/routes/empleadoRoutes');
const ClienteRoutes = require('./app/routes/ClienteRoutes');
const citasRoutes = require('./app/routes/citasRoutes');
const ventasRoutes = require('./app/routes/ventasRoutes');
const swaggerDocs = require('./app/config/swagger');
// require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Permitir todos los dominios (cambia esto en producción)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));
app.use(express.json());

swaggerDocs(app);

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/services', servicioRoutes);
app.use('/api/products', productRoutes);
app.use('/api/employees', empleadoRoutes);
app.use('/api/clients', ClienteRoutes);
app.use('/api/appointments', citasRoutes);
app.use('/api/sales', ventasRoutes);

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
app.listen(PORT, '0.0.0.0', () => {
  // console.log('Servidor Corriendo en http://localhost:3000');
  // console.log('Servidor Corriendo en http://localhost:3000');
  // console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Servidor corriendo en http://192.168.1.68:${PORT}`);
});

// Proyecto Integrador.