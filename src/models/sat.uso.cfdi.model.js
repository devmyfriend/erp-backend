import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";

export const UsoCFDI = Connection.define(
    "CFDI",
    {
        ClaveUsoCFDI: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false,
        },
        Descripcion: {
            type: DataTypes.STRING,
        },
        Fisica: {
            type: DataTypes.BOOLEAN,
        },
        Moral: {
            type: DataTypes.BOOLEAN,
        },
        Activo: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize: Connection,
        modelName: "CFDI",
        tableName: "SAT_UsoCFDI",
        timestamps: false,
        freezeTableName: false,
    }
);