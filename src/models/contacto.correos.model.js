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
		VwEmailId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
	},
	{
		tableName: 'contacto_VwEmails',
		timestamps: false,
		freezeTableName: true,
	},
);
