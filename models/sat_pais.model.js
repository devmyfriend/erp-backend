const { DataTypes } = require('sequelize');

const { Mariadb } = require( '../database/mariadb.database' )

const Pais = Mariadb.define( 'SAT_Pais',{
    clave:{
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
    },
    Descripcion:{
        type: DataTypes.STRING,
    }
    
},{
    freezeTableName: false
})

module.exports = Pais