import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const ContactoTelefono = Connection.define(
	'ContactoTelefono',
	{
		ContactoId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		TelefonoId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
	},
	{
		tableName: 'contacto_telefono',
		timestamps: false,
		freezeTableName: true,
	},
);
