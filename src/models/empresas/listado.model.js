import { DataTypes } from "sequelize";
import { Connection } from "../../database/mariadb.database.js";

export const Longitud = Connection.define(
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
        Propietaria: {
            type: DataTypes.TINYINT,
        },
        Direccion: {
            type: DataTypes.STRING,
        },
        NumeroTelefonico: {
            type: DataTypes.STRING,
        },
        }, {
            sequelize: Connection,
            modelName: 'ListadoEmpresas',
            tableName: 'ListadoEmpresas',
            freezeTableName: true,
    }
);