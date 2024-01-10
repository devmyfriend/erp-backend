import { DataTypes } from 'sequelize';
import { Connection } from "../database/mariadb.database.js";

export const Colonia = Connection.define(
    'Colonias',
    {
        idColonia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        ClaveColonia:{
            type: DataTypes.STRING,
            allowNull: true,
            
        },
        CodigoPostal:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Nombre:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: Connection,
        modelName: 'Colonias',
        tableName: 'SAT_Colonias',
        timestamps: false,
        freezeTableName: true,
    },
);