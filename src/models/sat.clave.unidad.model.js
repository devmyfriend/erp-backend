import { DataTypes } from "sequelize"
import { Connection } from "../database/mariadb.database.js"

export const UnitKey = Connection.define(
    'satUnitKey',
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
            modelName: 'satUnitKey',
            tableName: 'SAT_ClavesUnidades',       
            freezeTableName: true,
            timestamps: false
        }
)

export default UnitKey;