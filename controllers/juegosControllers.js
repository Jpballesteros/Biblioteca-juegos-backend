// Importamos o requerimos la bd
const db = require('../db');

// Función para obtener todos los juegos (listar)
exports.obtenerJuegos = (req, res) => {
    db.query('SELECT * FROM juegos', (error, resultados) => {
        if(error){
            console.log('Error al obtener los juegos', error);
            res.status(500).json({error: "Error en el servidor"})
            return
        }
        // Devolvemos los juegos obtenimos
        res.json({estado: 201, juegos: resultados})
    })
}

// Función para crear un nuevo juego
exports.crearJuego = (req, res) =>{
    const {nombre, descripcion, precio} = req.body;
    const imagen = req.file.path;

    db.query('INSERT INTO juegos(nombre, descripcion, precio, imagen) VALUES(?, ?, ?, ?)', [nombre, descripcion, precio, imagen], (err, result) => {
        if(err){
            console.log('Error al insertar juego', err);
            res.status(500).json({error: "Error en el servidor"})
            return
        }
        res.json({estado: 201, mensaje:"juego guardado exitosamente"})
    })
}

//Obtenemos juegos por id de la bd
exports.obtenerJuegoId = (req, res) => {
    const { id } = req.params;
      // Realiza la consulta SQL para obtener el producto por su ID
      const sql = 'SELECT * FROM juegos WHERE id = ?';
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error('Error al obtener el juego:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
        }
    
        // Verifica si se encontró un producto con el ID especificado
        if (result.length === 0) {
          res.json({ estado:404, mensaje: 'juego no encontrado' });
          return;
        }
        // const imagenConPrefijo = `data:image/jpeg;base64,${result[0].imagen}`;
  
       
  
        // Si se encontró el producto, devuélvelo como respuesta
        res.json({estado:201, producto: result[0]});
    })
};

// Funcion para actualizar juegos
exports.actualizarJuego =  (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    const imagen = req.file.path;
  
  // Verificar si el ID del producto existe
  const sqlVerificar = 'SELECT * FROM juegos WHERE id = ?';
  db.query(sqlVerificar, [id], (err, result) => {
    if (err) {
      console.error('Error al verificar el juego:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
  
    // Si no se encontró un producto con el ID especificado, devolver un error
    if (result.length === 0) {
      res.status(404).json({ estado: 404, mensaje: 'El juego no existe' });
      return;
    }
  
    db.query('UPDATE juegos SET nombre = ?, precio = ?, descripcion = ?, imagen = ? WHERE id = ?', [nombre, precio, descripcion, imagen,id], (err, result) => {
        console.log(result)
        if (err) {
            console.error('Error al actualizar juego:', err);
            res.status(500).json({ error: 'Error al actualizar juego en la base de datos' });
            return;
        }
  
            // Verifica si se encontró un producto con el ID especificado
            if (result.length === 0) {
             res.json({ estado:404, mensaje: 'juego no encontrado' });
            return;
        }
        res.json({ estado: 201, mensaje: "juego actualizado exitosamente"});
    });
})
};

// Función para eliminar juegos de la bd
exports.eliminarJuego =  (req, res) => {
    const { id } = req.params;
  
    // Verificar si el ID del producto existe
  const sqlVerificar = 'SELECT * FROM juegos WHERE id = ?';
  db.query(sqlVerificar, [id], (err, result) => {
    if (err) {
      console.error('Error al verificar el juego:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
  
    // Si no se encontró un producto con el ID especificado, devolver un error
    if (result.length === 0) {
      res.status(404).json({ estado: 404, mensaje: 'El juego no existe' });
      return;
    }
  
    db.query('DELETE FROM juegos WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar juego:', err);
        res.status(500).json({ error: 'Error al eliminar juego de la base de datos' });
        return;
      }
      res.json({estado:201, mensaje:'juego eliminado'});
    });
  
})
    
};