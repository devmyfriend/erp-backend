import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";

export const OwnTax = Connection.define(
    'OwnTax',
    {
        cfgImpuestoId:
        {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        NombreImpuesto:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
        ClaveImpuesto:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CreadoPor:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CreadoEn:
        {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        Borrado:
        {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0,
        },
        BorradoPor:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        BorradoEn:
        {
            type: DataTypes.DATE,
            allowNull: true,
        },
        ActualizadoPor:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        ActualizadoEn:
        {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'cfgImpuestos',
        timestamps: false,
        freezeTableName: true,
    }
    )


