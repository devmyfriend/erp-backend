import { DataTypes } from "sequelize"
import { Connection } from "../database/mariadb.database.js"

export const ClaveUnidad = Connection.define(
    'ClaveUnidad',
    {
        ClaveUnidadSat: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        NombreUnidadSat: {
            type: DataTypes.STRING
        },
        Activo: {
            type: DataTypes.BOOLEAN
        },
},  {
            sequelize: Connection,
            modelName: 'ClaveUnidad',
            tableName: 'SAT_ClavesUnidades',       
            freezeTableName: true,
            timestamps: false
        }
)

export default ClaveUnidad;