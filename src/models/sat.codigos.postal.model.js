import { DataTypes } from 'sequelize'
import { Connection } from '../database/mariadb.database.js'

export const CodigoPostal = Connection.define(
    'CodigosPostal',
    {
            CodigoPostal: {
                type: DataTypes.STRING,
                autoIncrement: false,
                primaryKey: true,
                allowNull: false
            },
            ClaveEstado: {
                type: DataTypes.STRING,
            },
            ClaveMunicipio: {
                type: DataTypes.STRING,
            },
            ClaveLocalidad: {
                type: DataTypes.STRING,
            },
         },
        {
            sequelize: Connection,
            modelName: 'CodigosPostal',
            tableName: 'SAT_CodigosPostal',
            freezeTableName: false,
        },
 );