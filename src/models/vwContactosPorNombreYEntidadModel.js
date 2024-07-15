import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const VistaContactos = Connection.define('vwContactosPorNombreYEntidad', {
    ContactoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    NombreContacto: {
        type: DataTypes.STRING,
    },
    ApellidoPaterno: {
        type: DataTypes.STRING,
    },
    ApellidoMaterno: {
        type: DataTypes.STRING,
    },
    Departamento: {
        type: DataTypes.STRING,
    },
    Puesto: {
        type: DataTypes.STRING,
    },
    EntidadNegocioId: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'vwContactosPorNombreYEntidad',
    timestamps: false,
    freezeTableName: true,
});
