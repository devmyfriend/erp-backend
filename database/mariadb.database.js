const { Sequelize } = require("sequelize");

const datosconexion = {
    usuario: 'dev',
    password: 'Cyber2000',
    catalogo: 'erpmf',
    puerto: '3307',
    host: 'lachosoft.cloud'
}


PORT = 3000
const Mariadb = new Sequelize('erpmf', 'dev', 'Cyber2000', {
    host: 'lachosoft.cloud',
    dialect: 'mariadb',
    port: '3307',
    logging: false
})

const Conexion = async () => {
    try {
        await Mariadb.authenticate()
        console.log('Conexión establecida con la base de datos.')
    } catch (error) {
        console.log(error)
        console.log('No se pudo establecer conexión la base de datos.')
    }
}


module.exports = {
    Mariadb,
    Conexion
}