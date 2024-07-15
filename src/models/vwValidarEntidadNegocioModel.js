import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const ValidarEntidadNegocio = Connection.define(
    'ValidarEntidadNegocio',
    {
        EntidadNegocioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        RFC: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        NombreOficial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PersonaMoral: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        Borrado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: 'vwValidarEntidadNegocio',
        timestamps: false,
        freezeTableName: true,
    }
);
