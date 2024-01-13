import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const EmpresaContacto = Connection.define(
    'EmpresaContacto',
    {
        ContactoId: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        EntidadNegocioId:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        },
        {
            tableName: 'empresa_contacto',
            timestamps: false,
            freezeTableName: true,
        }
)