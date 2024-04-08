import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Impuesto = Connection.define(
    'Impuesto',
    {
        ClaveImpuesto:
        {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        Nombre:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Activo:
        {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        tableName: 'SAT_Impuestos',
        timestamps: false,
        freezeTableName: true,
    },
)
export const ImpuestoCustom = Connection.define(
'ImpuestoCustom',
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
export const ImpuestoCompuesto = Connection.define(
    'ImpuestoCompuesto',
    {
        ImpuestoCompuestoId:
        {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        Nombre:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Predeterminado:
        {
            type: DataTypes.BOOLEAN,
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
        tableName: 'cfgImpuestosCompuestos',
        timestamps: false,
        freezeTableName: true,
    }
)