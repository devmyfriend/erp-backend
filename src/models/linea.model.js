import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Linea = Connection.define(
    'Linea',
    {
        LineaId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        SubFamiliaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'SubFamilia',
                key: 'SubFamiliaId'
            }
        },
        NombreLinea: {
            type: DataTypes.STRING,
        },
        Borrado: {
            type: DataTypes.BOOLEAN,
        },
        BorradoPor: {
            type: DataTypes.INTEGER,
        },
        BorradoEn: {
            type: DataTypes.DATE,
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
    },
    {
        tableName: 'cat_Lineas',
        timestamps: false,
        freezeTableName: true,
    },
);