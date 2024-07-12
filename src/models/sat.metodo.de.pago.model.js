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
            sequelize: Connection,
            modelName: 'SAT_MetodoPago',
            tableName: 'SAT_MetodoPago',
            timestamps: false,
            freezeTableName: true,
        },
);

export default MetodoDePago;