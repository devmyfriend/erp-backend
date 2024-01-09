import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js'

export const ContactoEntidad = Connection.define(
    'orgContactoEntidad',
    {
        EntidadNegocioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
        ContactoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
    }, {
        sequelize: Connection,
        modelName: 'orgContactoEntidad',
        tableName: 'orgContactoEntidad',
        freezeTableName: false
    }
);