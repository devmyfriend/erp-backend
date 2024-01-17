import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";

export const ListadoEmpresas = Connection.define(
    'ListadoEmpresas', {
        EntidadNegocioId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        NombreOficial: {
            type: DataTypes.STRING,
        },
        RFC: {
            type: DataTypes.STRING,
        },
        esPropietaria: {
            type: DataTypes.TINYINT,
        },
        Telefono:{
            type: DataTypes.STRING,
        },
        Direccion: {
            type: DataTypes.STRING,
        },
        }, {
            sequelize: Connection,
            modelName: 'ListadoEmpresas',
            tableName: 'ListadoEmpresas',
            freezeTableName: false,
    }
);