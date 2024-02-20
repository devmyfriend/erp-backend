import { DataTypes } from 'sequelize'
import { Connection } from '../database/mariadb.database.js'

export const typeOfReceipt = Connection.define(
    'TypeOfReceipt',
    {
        ClaveTipoDeComprobante: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Borrado: {
            type: DataTypes.BOOLEAN
        },
    },
    {
        tableName: 'SAT_TipoDeComprobante',
        timestamps: false,
        freezeTableName: true,
    },
)