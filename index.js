const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const recordRoutes = require('./routes/recordRoutes');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Para leer los datos en el cuerpo de la solicitud

// Rutas
app.use('/api', userRoutes);
app.use('/api', servicesRoutes);
app.use('/api', productsRoutes);
app.use('/api', recordRoutes);
app.use('/api', sensorRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
