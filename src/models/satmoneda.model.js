import { DataTypes } from 'sequelize';
import { Connection} from '../database/mariadb.database.js';

export const SatMonedaModel = Connection.define(
    'SatMoneda',
    {
        ClaveMoneda: {
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
        tableName: 'SAT_Moneda',
        timestamps: false,
        freezeTableName: true,
    },
);