// index.js

const express = require('express');
const userRoutes = require('./app/routes/userRoutes');
const servicioRoutes = require('./app/routes/servicioRoutes');
const productRoute = require('./app/routes/productRoute');
const empleadoRoutes = require('./app/routes/empleadoRoutes');
const ClienteRoutes = require('./app/routes/ClienteRoutes');
const citasRoute = require('./app/routes/citasRoute');
const saleRoutes = require('./app/routes/saleRoutes');
const swaggerDocs = require('./app/config/swagger');
// require('dotenv').config();

const app = express();
swaggerDocs(app);
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/services', servicioRoutes);
app.use('/api/products', productRoute);
app.use('/api/employees', empleadoRoutes);
app.use('/api/clients', ClienteRoutes);
app.use('/api/appointments', citasRoute);
app.use('/api/sales', saleRoutes);

// const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log('Servidor Corriendo en http://localhost:3000');
});

// Proyecto Integrador.