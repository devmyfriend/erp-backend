import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const EmpresaTelefono = Connection.define(
    'EmpresaTelefono',
    {
       TelefonoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
       },
       EntidadNegocioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
       },
    },
    {
        tableName: 'empresa_telefono',
        timestamps: false,
        freezeTableName: true,
    }
)