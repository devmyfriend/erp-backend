import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';


export const ContactoEmail = Connection.define(
    'ContactoEmail',
    {
        ContactoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        EmailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
 }, 
        {
            sequelize: Connection,
            modelName: 'SucursalContacto',
            tableName: 'orgContactos',
            timestamps: false,
            freezeTableName: false,
        },
);