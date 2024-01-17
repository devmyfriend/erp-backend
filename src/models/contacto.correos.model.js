import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const ContactoCorreo = Connection.define(
	'ContactoCorreo',
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
		tableName: 'contacto_emails',
		timestamps: false,
		freezeTableName: true,
	},
);
