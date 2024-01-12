import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Domicilio = Connection.define(
    'orgDomicilios',
    {
        DomicilioId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },  
        Calle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        NumeroExt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        NumeroInt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CodigoPostal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ClaveEstado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ClaveMunicipio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ClaveLocalidad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ClaveColonia: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ClavePais: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize: Connection,
        modelName: 'orgDomicilios',
        tableName: 'orgDomicilios',
        freezeTableName: false,
        timestamps: false
    }
);