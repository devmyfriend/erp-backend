import { DataTypes } from 'sequelize';
import { Connection} from '../database/mariadb.database.js';

export const vwSatMetodoPagoModel = Connection.define(
    'SatMetodoPago',
    {
        ClaveMetodoPago: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        Descripcion: {
            type: DataTypes.STRING,
        },
        Activo: {
            allowNull: false,
            defaultValue: 1,
            type: DataTypes.BOOLEAN,
        }
    },
    
    {
        tableName: 'SAT_MetodoPago',
        timestamps: false,
        freezeTableName: true,
    },
);