import { DataTypes } from 'sequelize';
import { Connection} from '../database/mariadb.database.js';

export const MetodoDePago = Connection.define(
    'MetodoDePago',
    {
        ClaveMetodoPago: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        Descripcion: {
            type: DataTypes.STRING,
        },
        Activo: {
            type: DataTypes.BOOLEAN,
        }
    },
        {
            tableName: 'SAT_MetodoPago',
            timestamps: false,
            freezeTableName: true,
        },
);