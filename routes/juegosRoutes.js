// Importamos el módulo express
const express = require('express');

// Creamos un router de express
const router = express.Router();
const multer = require('multer');

// Importamos el controlador
const juegosControllers = require('../controllers/juegosControllers');

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, './uploads')
    },
    filename: (req,file, callback) =>{
        const ext = file.originalname.split('.').pop()
        callback(null, `${Date.now()}.${ext}`)
    }
  })
  
  const upload = multer({storage})

// Definimos las rutas para los juegos
router.get('/juegos/listar', juegosControllers.obtenerJuegos);
router.post('/juegos/crear', upload.single('imagen'), juegosControllers.crearJuego);
router.get('/juegos/detalle/:id', juegosControllers.obtenerJuegoId);
router.put('/juegos/actualizar/:id', upload.single('imagen'), juegosControllers.actualizarJuego);
router.delete('/juegos/eliminar/:id', juegosControllers.eliminarJuego);

// Exportamos el router para que pueda ser utilizado en la aplicación principal
module.exports = router;