// Importamos el módulo de express
const express = require('express');
const cors = require('cors');

// Importamos los módulos necesarios (rutas)
const juegosRoutes = require('./routes/juegosRoutes');

// instancia de una app de express
const app = express();
app.use(cors());

// Llamamos al archivo json
app.use(express.json());

// Usamos las rutas definidas
app.use('/uploads', express.static('uploads')); 
app.use('/api',juegosRoutes);

// Establecemos el puerto en el que se ejecutara el servidor express
app.listen(3100, () =>{
    console.log('Servidor corriendo en el puerto 3100')
});

