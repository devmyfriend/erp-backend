import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Domicilio = Connection.define(
    'Domicilio',
    {
        DomicilioId: {
            type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
            primaryKey: true,
			allowNull: false,
			autoIncrement: true,
        },
        Calle: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        NumeroExt: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        NumeroInt: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        CodigoPostal: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        ClaveEstado: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        ClaveMunicipio: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        ClaveLocalidad: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        ClaveColonia: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        ClavePais: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        CreadoPor: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ActaulizadoPor: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        BorradoPor: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        BorradoEn: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize: Connection,
        modelName: 'Domicilios',
        tableName: 'orgDomicilios', 
        timestamps: false, 
        freezeTableName: true 
    }
);
