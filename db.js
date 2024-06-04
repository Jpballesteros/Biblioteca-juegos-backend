// Importamos el módulo mysql
const mysqyl = require('mysql');

// Configuramos la conexión a la bd 
const connection = mysqyl.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_biblioteca-juegos'
});

// Conectamos a la bd
connection.connect((error) =>{
    if(error){
        console.error('Error al conectar con la base de datos', error);
        return;
    }
    console.log('conexión exitosa a la base de datos');
});

// Exportamos la conexión a la bd
module.exports = connection;

