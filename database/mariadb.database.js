const { Sequelize} = require("sequelize");

const datosconexion ={
    usuario: 'root',
    password: 'Cyber2000',
    catalogo: 'erpmf',
    puerto: '3307',
    host: 'lachosoft.cloud'
}

const Mariadb = new Sequelize( 'erpmf', 'dev', 'Cyber2000', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    port: '3307',
    logging: false
} )

const Conexion = async ()=>{
    try{
        await Mariadb.authenticate()
        console.log('Conexión establecida con la base de datos.')
    }catch( error ){
        console.log( error )
        console.log( 'No se pudo establecer conexión la base de datos.')
    }
}


module.exports ={
    Mariadb,
    Conexion
}