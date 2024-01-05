import { DataTypes } from 'sequelize';
import { Connection } from '../../database/mariadb.database.js';

export const LongitudBusqueda = Connection.define(
    'LongitudBusqueda',{
        total:{
            type: DataTypes.INTEGER,
        },
    },{
        sequelize: Connection,
        modelName: 'LongitudBusqueda',
        tableName: 'LongitudBusqueda',
        freezeTableName: true,
    },
);