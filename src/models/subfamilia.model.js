import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Subfamilia = Connection.define(
    'SubFamilia',
    {
        SubFamiliaId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        FamiliaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Familia',
                key: 'FamiliaId'
            }
        },
        NombreSubFamilia: {
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
    },
    {
        tableName: 'cat_SubFamilias',
        timestamps: false,
        freezeTableName: true,
    },
);