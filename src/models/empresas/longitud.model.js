import { DataTypes } from 'sequelize';
import { Connection } from '../../database/mariadb.database.js';

export const Longitud = Connection.define(
    'LongitudEmpresas',{
        Longitud:{
            type: DataTypes.INTEGER,
        },
    },{
        sequelize: Connection,
        modelName: 'LongitudEmpresas',
        tableName: 'LongitudEmpresas',
        freezeTableName: true,
    },
);