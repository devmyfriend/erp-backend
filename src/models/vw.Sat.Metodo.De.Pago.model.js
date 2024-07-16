import { DataTypes } from 'sequelize';
import { Connection} from '../database/mariadb.database.js';

export const VwMetodoDePago = Connection.define(
    'VwMetodoDePago',
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
            modelName: 'Vw_SAT_MetodoPago',
            tableName: 'Vw_SAT_MetodoPago',
            timestamps: false,
            freezeTableName: true,
        },
);

export default VwMetodoDePago;