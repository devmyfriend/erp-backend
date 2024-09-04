import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Familia = Connection.define(
    'Familia',
    {
        FamiliaId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NombreFamilia: {
            type: DataTypes.STRING,
        },
        Activo: {
            type: DataTypes.BOOLEAN,
        },
        CreadoPor: {
            type: DataTypes.INTEGER,
        },
        CreadoEn: {
            type: DataTypes.DATE,
        },
        ActualizadoPor: {
            type: DataTypes.INTEGER,
        },
        ActualizadoEn: {
            type: DataTypes.DATE,
        },
        BorradoPor: {
            type: DataTypes.INTEGER,
        },
        BorradoEn: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: 'cat_Familias',
        timestamps: false,
        freezeTableName: true,
    },
);