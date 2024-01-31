import { DataTypes } from 'sequelize';
import { Connection} from '../database/mariadb.database.js';

export const paymentType = Connection.define(
    'PaymentType',
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