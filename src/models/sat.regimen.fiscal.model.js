import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const regimenFiscal = Connection.define(
    'SAT_RegimenFiscal',
    {
        ClaveRegimenFiscal: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false,
        },
        Descripcion: {
            type: DataTypes.STRING,
        },
        Fisica : {
            type: DataTypes.BOOLEAN,
        },
        Moral : {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize: Connection,
        modelName: 'SAT_RegimenFiscal',
        tableName: 'SAT_RegimenFiscal',
        freezeTableName: false,
    },
);