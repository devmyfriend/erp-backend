import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Ubicaciones = Connection.define(
    'Ubicaciones',
    {
        UbicacionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre: {
            type: DataTypes.STRING,
        },
        Borrado: {
            type: DataTypes.BOOLEAN,
        },
        CreadoPor: {
            type: DataTypes.INTEGER,
        },
        ActualizadoPor: {
            type: DataTypes.INTEGER,
        },
        BorradoPor: {
            type: DataTypes.INTEGER,
        },
        BorradoEn: {
            type: DataTypes.DATE,
        },
    },

    {
        tableName: 'cat_Ubicaciones',
        timestamps: false,
        freezeTableName: true,
        },
);